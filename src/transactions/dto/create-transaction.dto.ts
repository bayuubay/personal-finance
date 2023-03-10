import { Transform } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { v4 as uuid } from "uuid";
import { TransactionType } from "../transaction-type.enum";

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  ammount: number = 0;

  @IsEnum(TransactionType)
  type: TransactionType
}