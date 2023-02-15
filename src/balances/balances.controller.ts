import { Body, Controller, Get, Post } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { CreateBalanceDto } from './dto/create-balance.dto';

@Controller('balances')
export class BalancesController {
  constructor(private balanceService: BalancesService){
    this.balanceService = balanceService
  }

  @Get()
  async getAllBalance(){
    const data = await this.balanceService.getAllBalance()
    return {
      data,
      statusCode: 200,
      message: 'Success'
    }
  }

  @Post()
  async createBalance(@Body() createBalanceDto: CreateBalanceDto){
    return await this.balanceService.createBalance(createBalanceDto)
  }
}
