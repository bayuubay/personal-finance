import { Injectable } from "@nestjs/common"
import { Transaction } from "src/transactions/transaction.entity"

@Injectable()
export class BalanceResponse {
  id: string = 'uuid'
  ammount: number = 0
  created_at: Date = new Date()
  updated_at: Date = new Date()
  transaction: Transaction
}