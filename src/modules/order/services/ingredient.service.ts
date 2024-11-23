import { Injectable } from '@nestjs/common';
import { CreateIngredientDto } from '../dto/create-ingredient.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';

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

  async findAll() {
    const ingredients = await this.ingredientRepository.find();
    return ingredients;
  }

  findOne(id: number) {
    return `This action returns a #${id} ingredient`;
  }
}
