import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BurgerService } from '../services/burger.service';
import { CreateBurgerDto } from '../dto/create-burger.dto';
// import { UpdateBurgerDto } from '../dto/update-burger.dto';

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

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateBurgerDto: UpdateBurgerDto) {
  //   return this.burgerService.update(+id, updateBurgerDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.burgerService.remove(+id);
  }
}
