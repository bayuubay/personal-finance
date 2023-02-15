import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateBalanceDto {
  @IsNotEmpty()
  @IsNumber()
  ammount: number
}