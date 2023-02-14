import { Injectable } from '@nestjs/common';
import { Balance } from './balances.entity'; 
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { Repository } from 'typeorm';

@Injectable()
export class BalancesService {

  constructor(
    @InjectRepository(Balance)
    private balanceRepository: Repository<Balance>){}

  async getAllBalance(): Promise<Balance[]>{
    console.log(this.balanceRepository);
    
    const list = await this.balanceRepository.find()
    console.log(list);
    
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
}
