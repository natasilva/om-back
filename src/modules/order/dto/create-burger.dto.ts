import { CreateBurgerIngredientDTO } from './create-burger-ingredient.dto';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBurgerDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  unit_price: number;

  @IsArray()
  burgerIngredients: CreateBurgerIngredientDTO[];
}
