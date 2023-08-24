import { Module } from '@nestjs/common';

import { CustomersController } from './customers/controllers/customers.controller';
import { CustomersService } from './customers/services/customers.service';
import { UsersController } from './users/controllers/users.controller';
import { UsersService } from './users/services/users.service';
import { OrdersController } from './orders/controllers/orders.controller';
import { OrdersService } from './orders/services/orders.service';
import { OrderItemService } from './orders/services/order-item.service';
import { OrderItemController } from './orders/controllers/order-item.controller';
import { ProductsModule } from '../products/products.module';
import { ProfileController } from './users/controllers/profile.controller';

@Module({
  imports: [ProductsModule],
  controllers: [CustomersController, UsersController, OrdersController, OrderItemController, ProfileController],
  providers: [CustomersService, UsersService, OrdersService, OrderItemService],
  exports: [UsersService]
})
export class UsersModule {}
