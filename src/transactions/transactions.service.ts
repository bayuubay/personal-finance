import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from './transaction-type.enum';
import { BalancesService } from 'src/balances/balances.service';

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
    if(type.toLocaleLowerCase() === 'income') {
      type = TransactionType.INCOME
      await this.balanceService.updateBalance({ammount: +ammount}, balanceId)
    }else{
      type = TransactionType.EXPENSE
      await this.balanceService.updateBalance({ammount: -ammount}, balanceId)
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
}
