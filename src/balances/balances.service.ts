import { Injectable } from '@nestjs/common';
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
    const {id, ammount, created_at, updated_at} = createBalanceDto
    const payload = {
      id,
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
    if(!data)return null
    return data
  }

  async updateBalance(updatebalanceDto: UpdateBalanceDto, id: string): Promise<void>{
    const balance = await this.balanceRepository.findOne({where: {id}})
    const {ammount} = updatebalanceDto
    if(balance){
      balance.ammount += ammount
      await this.balanceRepository.save(balance)
    }
  }
}
