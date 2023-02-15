import { Injectable } from "@nestjs/common"
import { ApiProperty } from "@nestjs/swagger"
import { Transaction } from "../../transactions/transaction.entity"

@Injectable()
export class BalanceResponse {
  @ApiProperty()
  id: string = 'uuid'
  @ApiProperty()
  ammount: number = 0
  @ApiProperty()
  created_at: Date = new Date()
  @ApiProperty()
  updated_at: Date = new Date()
  @ApiProperty()
  transaction: Transaction
}