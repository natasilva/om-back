import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Burger } from './burger.entity';
import { Order } from './order.entity';

@Entity('order_burger')
export class OrderBurger {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  quantity: number;

  @ManyToOne(() => Order, (order) => order.orderBurgers)
  order: Order;

  @ManyToOne(() => Burger)
  burger: Burger;
}
