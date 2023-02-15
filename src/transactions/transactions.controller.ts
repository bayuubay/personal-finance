import { Controller, Param, Post, Body, Get } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionService: TransactionsService){
    this.transactionService = transactionService
  }

  @Post('/:balance_id')
  async createTrasaction(@Body() createTransactionDto: CreateTransactionDto, @Param('balance_id') balanceId: string){
    const data = await this.transactionService.createTransaction(createTransactionDto, balanceId)
    return{
      data,
      statusCode: 201,
      message:'Success'
    }
  }

  @Get('/:balance_id')
  async getTransactionByBalanceId(@Param('balance_id') balanceId: string){
    const data = await this.transactionService.getTransactionByBalanceId(balanceId)
    return {
      data,
      statusCode: 200,
      message: 'Success'
    }
  }
}
