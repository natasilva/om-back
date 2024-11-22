import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('ingredient')
export class Ingredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @Column('decimal')
  unit_price: number;

  @Column()
  is_additional: boolean;
}
