import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Balance } from './balances.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { Repository } from 'typeorm';
import { UpdateBalanceDto } from './dto/update-balance.dto';

@Injectable()
export class BalancesService {

  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>){}

  async getAllBalance(): Promise<Balance[]>{
    
    const list = await this.balanceRepository.find()
    
    if(!list){
      return []
    }
    return list
  }

  async createBalance(createBalanceDto: CreateBalanceDto): Promise<Balance>{
    const {ammount} = createBalanceDto
    if(!ammount){
      throw new BadRequestException('Ammount is required')
    }
    const payload = {
      ammount,
      created_at: new Date(),
      updated_at: new Date(),
    }
    const data = this.balanceRepository.create(payload)
    await this.balanceRepository.save(data)

    return data
  }

  async getBalanceById(balanceId: string):Promise<Balance>{
    const data = await this.balanceRepository.findOne({where: {id: balanceId}})
    if(!data){
      throw new NotFoundException('Balance Data Not Found')
    }
    return data
  }

  async updateBalance(updatebalanceDto: UpdateBalanceDto, id: string): Promise<void>{
    const balance = await this.getBalanceById(id)
    const {ammount} = updatebalanceDto
    if(balance){
      balance.ammount += ammount
      balance.updated_at = new Date()
      await this.balanceRepository.save(balance)
    }
  }
}
