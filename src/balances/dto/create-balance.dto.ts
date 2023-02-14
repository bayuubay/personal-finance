import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsUUID } from "class-validator";
import { v4 as uuid } from "uuid";

export class CreateBalanceDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ammount: number = 0;
}