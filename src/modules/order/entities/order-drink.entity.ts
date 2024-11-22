import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './order.entity';
import { Drink } from './drink.entity';

@Entity('order_drink')
export class OrderDrink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderDrinks)
  order: Order;

  @ManyToOne(() => Drink)
  drink: Drink;
}
