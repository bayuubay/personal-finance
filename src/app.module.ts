import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalancesModule } from './balances/balances.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './balances/balances.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/transaction.entity';

@Module({
  imports: [BalancesModule,
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: ".database/data.sqlite",
      entities: [Balance, Transaction],
      synchronize: true
    }),
    TransactionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
