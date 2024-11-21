import { Module } from '@nestjs/common';
import { OrderService } from '../order/services/order.service';
import { OrderController } from './controllers/order.controller';
import { DrinkController } from './controllers/drink.controller';
import { BurgerController } from './controllers/burger.controller';
import { IngredientController } from './controllers/ingredient.controller';
import { DrinkService } from './services/drink.service';
import { BurgerService } from './services/burger.service';
import { IngredientService } from './services/ingredient.service';

@Module({
  controllers: [
    OrderController,
    DrinkController,
    BurgerController,
    IngredientController,
  ],
  providers: [OrderService, DrinkService, BurgerService, IngredientService],
})
export class OrderModule {}
