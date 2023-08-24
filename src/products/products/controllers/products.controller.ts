import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
  BadRequestException,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductsService } from 'src/products/products/services/products.service';
import { CreateProductDto, FilterProductsDto, UpdateProductDto } from '../dtos/product.dto';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../../auth/guards/roles.guard';
import { Public } from '../../../auth/decorators/public.decorator';
import { Roles } from '../../../auth/decorators/roles.decorators';
import { Role } from '../../../auth/models/roles.model';

@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'List of products' })
  findAll(@Query() params?: FilterProductsDto) {
    return this.productsService.findAll(params);
  }

  @Get('filter')
  getFilter() {
    return {
      message: `yo soy un filter`,
    };
  }

  @Public()
  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId', ParseIntPipe) productId: number) {
    return this.productsService.findOne(productId);
  }

  @Roles(Role.ADMIN)
  @Post()
  create(@Body() payload: CreateProductDto) {
    try {
      return this.productsService.create(payload);      
    } catch (error) {
      throw new BadRequestException(`${error.message || 'Unexpected Error'}'`);
    }
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    return this.productsService.update(+id, payload);
  }

  @Put(':id/category/:categoryId')
  addCategoryToProduct(
    @Param('id') id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryToProduct(id, categoryId);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.productsService.delete(+id);
  }

  @Delete(':id/category/:categoryId')
  deleteCategory(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
