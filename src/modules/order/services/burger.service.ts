import { Injectable } from '@nestjs/common';
import { CreateBurgerDto } from '../dto/create-burger.dto';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Burger } from '../entities/burger.entity';
import { BurgerIngredient } from '../entities/burger-ingredient.entity';
import { CreateBurgerIngredientDTO } from '../dto/create-burger-ingredient.dto';

@Injectable()
export class BurgerService {
  constructor(
    @InjectRepository(Burger) private burgerRepository: Repository<Burger>,
    @InjectRepository(BurgerIngredient)
    private burgerIngredientRepository: Repository<BurgerIngredient>,
    private dataSource: DataSource,
  ) {}

  async create(createBurgerDto: CreateBurgerDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const burger = this.burgerRepository.create({
        code: createBurgerDto.code,
        description: createBurgerDto.description,
        unit_price: createBurgerDto.unit_price,
      });

      const savedBurger = await queryRunner.manager.save(burger);

      const burgerIngredients: BurgerIngredient[] = await Promise.all(
        createBurgerDto.burgerIngredients.map(
          async (createBurgerIngredientDTO: CreateBurgerIngredientDTO) => {
            const burgerIngredient = this.burgerIngredientRepository.create({
              quantity: createBurgerIngredientDTO.quantity,
              burger: savedBurger,
              ingredient: { id: createBurgerIngredientDTO.ingredientId },
            });
            return queryRunner.manager.save(burgerIngredient);
          },
        ),
      );

      await queryRunner.commitTransaction();

      return { ...savedBurger, burgerIngredients };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const burgers = await this.burgerRepository.find({
      relations: ['burgerIngredients', 'burgerIngredients.ingredient'],
    });
    return burgers;
  }

  findOne(id: number) {
    return `This action returns a #${id} burger`;
  }
}
