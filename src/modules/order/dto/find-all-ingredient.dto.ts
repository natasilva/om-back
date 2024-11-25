import { Optional } from '@nestjs/common';

export class FindAllIngredientDto {
  @Optional()
  is_additional: string;
}
