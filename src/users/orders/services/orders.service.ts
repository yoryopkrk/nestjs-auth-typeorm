import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, Repository } from 'typeorm';

import { Order } from '../../../database/entities/users/order.entity';
import { Customer } from '../../../database/entities/users/customer.entity';
import { User } from '../../../database/entities/users/user.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(User) private userRepo: Repository<User>,
  ) {}

  findAll() {
    return this.orderRepo.find();
  }

  async ordersByCustomer(userId: number) {
    const where: FindOptionsWhere<Order> = {};
    const customerId = (
      await this.userRepo.findOne({
        where: { id: userId },
        relations: ['customer'],
      })
    ).customer.id;
    return this.orderRepo.find({
      where: { customer: { id: customerId } },
      relations: ['items', 'items.product'],
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id: id },
      relations: ['items', 'items.product'],
    });
    if (!order) {
      throw new NotFoundException('not found');
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const order = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: data.customerId },
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({ where: { id: id } });
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: changes.customerId },
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  delete(id: number) {
    return this.orderRepo.delete(id);
  }
}
