import { Transaction } from "src/transactions/transaction.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Balance extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ammount: number

  @Column()
  created_at: Date

  @Column()
  updated_at: Date

  @OneToMany(_type => Transaction, transaction => transaction.balance, {eager: true})
  transaction: Transaction[]
}