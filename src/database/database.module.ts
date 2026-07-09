import { Module, Global } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { Product } from './entities/products/product.entity';
import { Brand } from './entities/products/brand.entity';
import { Category } from './entities/products/category.entity';
import { Customer } from './entities/users/customer.entity';
import { OrderItem } from './entities/users/order-item.entity';
import { Order } from './entities/users/order.entity';
import { User } from './entities/users/user.entity';
// import { UserRepository } from './entities/users/user.repository';
// import { UsersServiceA } from './providers/user.service';

import config from '../config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const dbType = configService.database.type;

        if (dbType === 'postgres') {
          const { user, host, dbName, password, port, url, schema, ssl } =
            configService.postgres;

          if (url) {
            return {
              type: 'postgres',
              url,
              schema,
              ssl,
              synchronize: false,
              autoLoadEntities: true,
            } as TypeOrmModuleOptions;
          }

          return {
            type: 'postgres',
            host,
            port,
            username: user,
            password,
            database: dbName,
            schema,
            ssl,
            synchronize: false,
            autoLoadEntities: true,
          } as TypeOrmModuleOptions;
        }

        const { user, host, dbName, password, port, url } = configService.mysql;

        if (url) {
          return {
            type: 'mysql',
            url,
            synchronize: false,
            autoLoadEntities: true,
          } as TypeOrmModuleOptions;
        }

        return {
          type: 'mysql',
          host,
          port,
          username: user,
          password,
          database: dbName,
          synchronize: false,
          autoLoadEntities: true,
        } as TypeOrmModuleOptions;
      },
    }),
    TypeOrmModule.forFeature([
      Product,
      Brand,
      Category,
      Customer,
      OrderItem,
      Order,
      User,
    ]),
  ],
  //providers: [UsersServiceA],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
