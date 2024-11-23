import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './order.entity';
import { Ingredient } from './ingredient.entity';

@Entity('order_additional')
export class OrderAdditional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderAdditionals)
  order: Order;

  @ManyToOne(() => Ingredient)
  ingredient: Ingredient;
}
