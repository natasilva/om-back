import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Burger } from './burger.entity';
import { Ingredient } from './ingredient.entity';

@Entity('burger-ingredient')
export class BurgerIngredient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Burger, (burger) => burger.burgerIngredients)
  burger: Burger;

  @ManyToOne(() => Ingredient)
  Ingredient: Ingredient;
}
