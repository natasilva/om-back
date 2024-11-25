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
    const ingredient = this.ingredientRepository.create({
      ...createIngredientDto,
      is_additional: createIngredientDto.is_additional == 'true',
    });

    return await this.ingredientRepository.save(ingredient);
  }

  async findAll(findAllIngredientDto: FindAllIngredientDto) {
    const { is_additional } = findAllIngredientDto;

    const ingredients = await this.ingredientRepository.find({
      where: {
        is_additional: is_additional == 'true',
      },
    });
    return ingredients;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }
}
