import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, In, Repository, FindOptionsWhere } from 'typeorm';

import { Product } from '../../../database/entities/products/product.entity';
import { Category } from '../../../database/entities/products/category.entity';
import { Brand } from '../../../database/entities/products/brand.entity';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset } = params;
      const { maxPrice, minPrice } = params;
      
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }

      return this.productRepo.find({
        relations: ['brand'],
        where,
        take: limit,
        skip: offset,
      });
    }

    return this.productRepo.find({
      relations: ['brand'],
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id: id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    const existe = await this.productRepo.findOne({
      where: { name: data.name },
    });

    if (!existe) {
      const newProduct = this.productRepo.create(data);
      if (data.brandId) {
        const brand = await this.brandRepo.findOne({
          where: { id: data.brandId },
        });
        newProduct.brand = brand;
      }

      if (data.categoriesIds) {
        const categories = await this.categoryRepo.findBy({
          id: In([data.categoriesIds]),
        });
        newProduct.categories = categories;
      }

      return await this.productRepo.save(newProduct);
    }

    return false;
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: changes.brandId },
      });
      product.brand = brand;
    }
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In([changes.categoriesIds]),
      });
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
    return await this.productRepo.save(product);
  }

  async addCategoryToProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne({ where: { id: categoryId }});
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async delete(id: number) {
    const product = await this.findOne(id);

    if (product) {
      return await this.productRepo.delete(id);
    }

    return false;
  }

  async removeCategoryByProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }
}
