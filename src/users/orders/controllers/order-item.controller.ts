import { Controller, Post, Body, ParseIntPipe, Param, Put, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { CreateOrderItemDto, UpdateOrderItemDto } from '../dtos/order-item.dto';
import { OrderItemService } from './../services/order-item.service';

@ApiTags('order-item')
@Controller('order-item')
export class OrderItemController {
  constructor(private itemsService: OrderItemService) {}

  @Post()
  @ApiOperation({ summary: 'Create order-item' })
  create(@Body() payload: CreateOrderItemDto) {
    return this.itemsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderItemDto,
  ) {
    return this.itemsService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.delete(+id);
  }
}
