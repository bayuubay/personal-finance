import { Module } from '@nestjs/common';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Balance } from './balances.entity';

@Module({
  controllers: [BalancesController],
  providers: [BalancesService],
  imports: [TypeOrmModule.forFeature([Balance])],
})
export class BalancesModule {}
