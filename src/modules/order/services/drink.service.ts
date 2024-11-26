import { Injectable } from '@nestjs/common';
import { CreateDrinkDto } from '../dto/create-drink.dto';
import { Drink } from '../entities/drink.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DrinkService {
  constructor(
    @InjectRepository(Drink) private drinkRepository: Repository<Drink>,
  ) {}

  async create(createDrinkDto: CreateDrinkDto) {
    const drink = this.drinkRepository.create(createDrinkDto);

    return await this.drinkRepository.save(drink);
  }

  async findAll() {
    const drinks = await this.drinkRepository.find();
    return drinks;
  }

  findOne(id: number) {
    return `This action returns a #${id} drink`;
  }
}
