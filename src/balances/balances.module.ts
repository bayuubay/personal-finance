import { Module } from '@nestjs/common';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './balances.entity';
import { BalanceResponse } from './response/balances.response';

@Module({
  controllers: [BalancesController],
  providers: [BalancesService],
  imports: [TypeOrmModule.forFeature([Balance])],
  exports: [BalancesService, TypeOrmModule.forFeature([Balance])]
})
export class BalancesModule {}
