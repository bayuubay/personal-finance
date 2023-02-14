import { Body, Controller, Get, Post } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('balances')
export class BalancesController {
  constructor(private balanceService: BalancesService){
    this.balanceService = balanceService
  }

  @Get()
  @ApiResponse({status: 200, description: 'Success', type: CreateBalanceDto})
  async getAllBalance(){
    const data = await this.balanceService.getAllBalance()
    return {
      data,
      statusCode: 200,
      message: 'Success'
    }
  }

  @Post()
  @ApiResponse({status: 201, description: 'Success'})
  async createBalance(@Body() createBalanceDto: CreateBalanceDto){
    return await this.balanceService.createBalance(createBalanceDto)
  }
}
