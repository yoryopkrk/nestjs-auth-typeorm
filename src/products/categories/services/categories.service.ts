import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../../../database/entities/products/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({ where: { id: id }, relations: ['products'] });
    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }
    return category;
  }

  async create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepo.create(data);
    return await this.categoryRepo.save(newCategory);
  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.findOne(id);
    this.categoryRepo.merge(category, changes);
    return await this.categoryRepo.save(category);
  }

  async delete(id: number) {
    const category = await this.findOne(id);
    
    if (category) {
      return await this.categoryRepo.delete(id);
    }

    return false;
  }
}
