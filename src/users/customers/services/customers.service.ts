import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Customer } from '../../../database/entities/users/customer.entity';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.customerRepo.find();
  }

  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepo.findOne({ where: { id: id } });
    if (!customer) {
      throw new NotFoundException(`Customer #${id} not found`);
    }
    return customer;
  }

  async create(data: CreateCustomerDto) {
    const newCustomer = this.customerRepo.create(data);
    return await this.customerRepo.save(newCustomer);
  }

  async update(id: number, changes: UpdateCustomerDto) {
    const customer = await this.findOne(id);
    this.customerRepo.merge(customer, changes);
    return await this.customerRepo.save(customer);
  }

  async delete(id: number) {
    const customer = await this.findOne(id);

    if (customer) {
      return await this.customerRepo.delete(id);
    }

    return false;
  }
}
