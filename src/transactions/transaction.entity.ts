import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TransactionType } from "./transaction-type.enum";
import { Balance } from "../balances/balances.entity";

@Entity()
export class Transaction extends BaseEntity{
  @PrimaryGeneratedColumn('uuid')
  id: string
  
  @Column()
  type: TransactionType

  @Column()
  ammount: number

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @ManyToOne(_type => Balance, balance => balance.transaction, {eager: false}) 
  balance: Balance
}