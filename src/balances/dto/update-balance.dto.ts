import { Transform } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";

export class UpdateBalanceDto {
  @Transform(({value}) => parseInt(value))
  @IsNumber()
  ammount: number
}