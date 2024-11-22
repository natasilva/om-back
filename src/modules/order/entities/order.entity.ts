import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { OrderDrink } from './order-drink.entity';
import { OrderAdditional } from './order-additional.entity';
import { OrderBurger } from './order-burger.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  description: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column({ type: 'jsonb' })
  address: {
    street: string;
    number: string;
    district: string;
  };

  @Column('text', { array: true })
  notes: string[];

  @Column('timestamp')
  orderDate: Date;

  @ManyToMany(() => OrderDrink)
  orderDrinks: OrderDrink[];

  @ManyToMany(() => OrderAdditional)
  orderAdditionals: OrderAdditional[];

  @ManyToMany(() => OrderBurger)
  orderBurgers: OrderBurger[];
}
