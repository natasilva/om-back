import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
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

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @ManyToMany(() => OrderDrink)
  orderDrinks: OrderDrink[];

  @ManyToMany(() => OrderAdditional)
  orderAdditionals: OrderAdditional[];

  @ManyToMany(() => OrderBurger)
  orderBurgers: OrderBurger[];
}
