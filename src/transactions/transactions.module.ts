import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction.entity';
import { BalancesService } from '../balances/balances.service';
import { Balance } from '../balances/balances.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), TypeOrmModule.forFeature([Balance])],
  controllers: [TransactionsController],
  providers: [TransactionsService, BalancesService]
})
export class TransactionsModule {}
