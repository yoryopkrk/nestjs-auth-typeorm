import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../../../database/entities/products/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/brand.dto';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
  ) {}

  findAll() {
    return this.brandRepo.find({
      relations: ['products']
    });
  }

  async findOne(id: number): Promise<Brand> {
    const brand = await this.brandRepo.findOne({ where: { id: id }, relations: ['products'] });
    if (!brand) {
      throw new NotFoundException(`Brand #${id} not found`);
    }
    return brand;
  }

  async create(data: CreateBrandDto) {
    const newBrand = this.brandRepo.create(data);
    return await this.brandRepo.save(newBrand);
  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.findOne(id);
    this.brandRepo.merge(brand, changes);
    return await this.brandRepo.save(brand);
  }

  async delete(id: number) {
    const brand = await this.findOne(id);
    if (brand) {
      return await this.brandRepo.delete(id);
    }

    return false;
  }
}
