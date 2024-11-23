import { Module } from '@nestjs/common';
import { OrderService } from '../order/services/order.service';
import { OrderController } from './controllers/order.controller';
import { DrinkController } from './controllers/drink.controller';
import { BurgerController } from './controllers/burger.controller';
import { IngredientController } from './controllers/ingredient.controller';
import { DrinkService } from './services/drink.service';
import { BurgerService } from './services/burger.service';
import { IngredientService } from './services/ingredient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from './entities/ingredient.entity';
import { Burger } from './entities/burger.entity';
import { Drink } from './entities/drink.entity';
import { Order } from './entities/order.entity';
import { OrderBurger } from './entities/order-burger.entity';
import { OrderAdditional } from './entities/order-additional.entity';
import { OrderDrink } from './entities/order-drink.entity';
import { BurgerIngredient } from './entities/burger-ingredient.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Drink,
      Burger,
      Ingredient,
      OrderBurger,
      OrderAdditional,
      OrderDrink,
      BurgerIngredient,
    ]),
  ],
  controllers: [
    OrderController,
    DrinkController,
    BurgerController,
    IngredientController,
  ],
  providers: [OrderService, DrinkService, BurgerService, IngredientService],
})
export class OrderModule {}
