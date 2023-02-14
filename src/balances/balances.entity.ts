import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}