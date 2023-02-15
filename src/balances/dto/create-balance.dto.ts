import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { v4 as uuid } from "uuid";

export class CreateBalanceDto {
  @IsNotEmpty()
  @IsUUID()
  id: string = uuid()

  @Transform(({value}) => parseInt(value))
  @IsNumber()
  ammount: number = 0;

  @IsDate()
  created_at: Date = new Date()

  @IsDate()
  updated_at: Date = new Date()
}