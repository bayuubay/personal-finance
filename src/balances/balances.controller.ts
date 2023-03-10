import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { CreateBalanceDto } from './dto/create-balance.dto';
import { ApiResponse } from '@nestjs/swagger';
import { BalanceResponse } from './response/balances.response';

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

  @Get('/:id')
  @ApiResponse({status: 200, description: 'Success', type: BalanceResponse})
  async getBalanceById(@Param('id') balanceId: string){
    const data = await this.balanceService.getBalanceById(balanceId)
    return {
      data,
      statusCode: 200,
      message: 'Success'
    }
  }

  @Post()
  @ApiResponse({status: 201, description: 'Success', type: BalanceResponse})
  async createBalance(@Body() createBalanceDto: CreateBalanceDto){
    return await this.balanceService.createBalance(createBalanceDto)
  }
}
