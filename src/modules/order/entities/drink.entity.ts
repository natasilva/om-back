import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('drink')
export class Drink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @Column('decimal')
  unit_price: number;

  @Column()
  has_sugar: boolean;
}
