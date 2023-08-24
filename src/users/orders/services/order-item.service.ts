import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../../../database/entities/users/order.entity';
import { OrderItem } from '../../../database/entities/users/order-item.entity';
import { Product } from '../../../database/entities/products/product.entity';
import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne({ where: { id: data.orderId }});
    const product = await this.productRepo.findOne({ where: { id: data.productId }});
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    return this.itemRepo.save(item);
  }

  async update(id: number, changes: UpdateOrderItemDto) {
    const item = await this.itemRepo.findOne({ where: { id: id }});
    if (changes.orderId) {
      const order = await this.orderRepo.findOne({ where: { id: changes.orderId }});
      item.order = order;
    }
    if (changes.productId) {
      const product = await this.productRepo.findOne({ where: { id: changes.productId }});
      item.product = product;
    }
    this.itemRepo.merge(item, changes);
    return this.itemRepo.save(item);
  }

  delete(id: number) {
    return this.itemRepo.delete(id);
  }
}