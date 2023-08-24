import { Module } from '@nestjs/common';

import { ProductsController } from './products/controllers/products.controller';
import { CategoriesController } from './categories/controllers/categories.controller';
import { BrandsController } from './brands/controllers/brands.controller';
import { ProductsService } from './products/services/products.service';
import { CategoriesService } from './categories/services/categories.service';
import { BrandsService } from './brands/services/brands.service';

@Module({
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule {}
