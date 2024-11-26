import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from '../dto/create-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';
import { FindAllIngredientDto } from '../dto/find-all-ingredient.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createIngredientDto: CreateIngredientDto) {
    const ingredient = this.ingredientRepository.create(createIngredientDto);
    return await this.ingredientRepository.save(ingredient);
  }

  async findAll(findAllIngredientDto: FindAllIngredientDto) {
    const { is_additional } = findAllIngredientDto;

    const params = {};

    if (typeof is_additional !== 'undefined') {
      Object.assign(params, {
        where: {
          is_additional: is_additional == 'true',
        },
      });
    }

    const ingredients = await this.ingredientRepository.find(params);
    return ingredients;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }
}
