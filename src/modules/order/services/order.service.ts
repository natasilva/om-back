import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from '../entities/order.entity';
import { OrderDrink } from '../entities/order-drink.entity';
import { CreateOrderDrinkDTO } from '../dto/create-order-drink.dto';
import { OrderAdditional } from '../entities/order-additional.entity';
import { OrderBurger } from '../entities/order-burger.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderBurger)
    private orderBurgerRepository: Repository<OrderBurger>,
    @InjectRepository(OrderAdditional)
    private orderAdditionalRepository: Repository<OrderAdditional>,
    @InjectRepository(OrderDrink)
    private orderDrinkRepository: Repository<OrderDrink>,
    private dataSource: DataSource,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const order = this.orderRepository.create({
        code: createOrderDto.code,
        description: createOrderDto.description,
        value: createOrderDto.value,
        notes: createOrderDto.notes,
        name: createOrderDto.name,
        phone: createOrderDto.phone,
        orderDate: new Date(createOrderDto.orderDate),
        address: createOrderDto.address,
      });

      const savedOrder = await queryRunner.manager.save(order);

      const orderDrinks: OrderDrink[] = await Promise.all(
        createOrderDto.orderDrinks.map(
          async (createOrderDrinkDTO: CreateOrderDrinkDTO) => {
            const burgerIngredient = this.orderDrinkRepository.create({
              quantity: createOrderDrinkDTO.quantity,
              order: savedOrder,
              drink: { id: createOrderDrinkDTO.drinkId },
            });
            return queryRunner.manager.save(burgerIngredient);
          },
        ),
      );

      const orderBurgers: OrderBurger[] = await Promise.all(
        createOrderDto.orderBurgers.map(async (createOrderBurgerDTO) => {
          const orderBurger = this.orderBurgerRepository.create({
            quantity: createOrderBurgerDTO.quantity,
            order: savedOrder,
            burger: { id: createOrderBurgerDTO.burgerId },
          });
          return queryRunner.manager.save(orderBurger);
        }),
      );

      const orderAdditionals: OrderAdditional[] = await Promise.all(
        createOrderDto.orderAdditionals.map(
          async (createOrderAdditionalDTO) => {
            const orderAdditional = this.orderAdditionalRepository.create({
              quantity: createOrderAdditionalDTO.quantity,
              order: savedOrder,
              ingredient: { id: createOrderAdditionalDTO.ingredientId },
            });
            return queryRunner.manager.save(orderAdditional);
          },
        ),
      );

      await queryRunner.commitTransaction();

      return { ...savedOrder, orderDrinks, orderAdditionals, orderBurgers };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const burgers = await this.orderRepository.find({
      relations: [
        'orderBurgers',
        'orderBurgers.burger',
        'orderAdditionals',
        'orderAdditionals.ingredient',
        'orderDrinks',
        'orderDrinks.drink',
      ],
    });
    return burgers;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }
}
