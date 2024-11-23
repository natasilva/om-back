import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { DrinkService } from '../services/drink.service';
import { CreateDrinkDto } from '../dto/create-drink.dto';

@Controller('drinks')
export class DrinkController {
  constructor(private readonly drinkService: DrinkService) {}

  @Post()
  create(@Body() createDrinkDto: CreateDrinkDto) {
    return this.drinkService.create(createDrinkDto);
  }

  @Get()
  findAll() {
    return this.drinkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.drinkService.findOne(+id);
  }
}
