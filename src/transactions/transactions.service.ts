import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from './transaction-type.enum';
import { BalancesService } from 'src/balances/balances.service';
import { Balance } from 'src/balances/balances.entity';

@Injectable()
export class TransactionsService {
  
  constructor(
    @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    private balanceService: BalancesService
    ){
  }

  async createTransaction(createTransactionDto: CreateTransactionDto, balanceId: string){
    let balance = await this.balanceService.getBalanceById(balanceId)
    let {ammount, type} = createTransactionDto
    if(!ammount){
      throw new BadRequestException('Ammount is required')
    }

    if(!type){
      throw new BadRequestException('Transaction type is required')
    }
    if(type.toLocaleLowerCase() === 'income') {
      type = TransactionType.INCOME
      await this.balanceService.updateBalance({ammount: +ammount}, balanceId)
    }else if (type.toLocaleLowerCase() === 'expense'){
      type = TransactionType.EXPENSE
      await this.balanceService.updateBalance({ammount: -ammount}, balanceId)
    } else {
      throw new BadRequestException('Type is not valid')
    }
    const payload = {
      ammount,
      type,
      created_at: new Date(),
      updated_at: new Date(),
      balance,
    }
    const created = this.transactionRepository.create(payload)
    await this.transactionRepository.save(created)
    return created
  }

  async getTransactionByBalanceId(balanceId: string): Promise<Transaction[]>{
    const transaction = await this.transactionRepository.find({where: {balance: {id: balanceId}}})
    if(!transaction?.length){
      throw new NotFoundException('Transactions data not found')
    }
    return transaction
  }
}
