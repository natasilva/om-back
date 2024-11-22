import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import { BurgerIngredient } from './burger-ingredient.entity';

@Entity('burger')
export class Burger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @Column('decimal')
  value: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToMany(() => BurgerIngredient)
  burgerIngredients: BurgerIngredient[];
}
