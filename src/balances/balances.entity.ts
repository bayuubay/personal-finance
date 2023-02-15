import { Transaction } from "../transactions/transaction.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Balance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ammount: number = 0

  @Column()
  created_at: Date = new Date()

  @Column()
  updated_at: Date = new Date()

  @OneToMany(_type => Transaction, transaction => transaction.balance, {eager: true})
  transaction: Transaction[]
}