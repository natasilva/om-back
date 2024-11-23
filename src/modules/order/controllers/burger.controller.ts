import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BurgerService } from '../services/burger.service';
import { CreateBurgerDto } from '../dto/create-burger.dto';

@Controller('burgers')
export class BurgerController {
  constructor(private readonly burgerService: BurgerService) {}

  @Post()
  create(@Body() createBurgerDto: CreateBurgerDto) {
    return this.burgerService.create(createBurgerDto);
  }

  @Get()
  findAll() {
    return this.burgerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.burgerService.findOne(+id);
  }
}
