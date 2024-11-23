import { CreateBurgerIngredientDTO } from './create-burger-ingredient.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBurgerDto {
  @IsNotEmpty()
  @IsString()
  code: string;
  description: string;
  value: number;
  burgerIngredients: CreateBurgerIngredientDTO[];
}
