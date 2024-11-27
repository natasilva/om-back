import { CreateOrderAdditionalDTO } from './create-order-additional.dto';
import { CreateOrderBurgerDTO } from './create-order-burger.dto';
import { CreateOrderDrinkDTO } from './create-order-drink.dto';

export class CreateOrderDto {
  code: string;
  description: string;
  name: string;
  value: number;
  phone: string;
  orderDate: Date;
  address: {
    street: string;
    number: string;
    district: string;
  };
  notes: string[];
  orderDrinks: CreateOrderDrinkDTO[];
  orderAdditionals: CreateOrderAdditionalDTO[];
  orderBurgers: CreateOrderBurgerDTO[];
}
