import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BalancesModule } from './balances/balances.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './balances/balances.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { Transaction } from './transactions/transaction.entity';
import { AppLoggerMiddleware } from './middlewares/logger.middleware';

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
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*')
  }
}
