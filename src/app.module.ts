import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
//import axios from 'axios';
import * as Joi from 'joi';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { enviroments } from './enviroments';
import { AuthModule } from './auth/auth.module';
import config from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        VERSION: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        MYSQL_URL: Joi.string(),
        MYSQL_DATABASE_URL: Joi.string(),
        MYSQL_DATABASE: Joi.string(),
        MYSQL_PORT: Joi.number(),
        MYSQL_PASSWORD: Joi.string(),
        MYSQL_USER: Joi.string(),
        MYSQL_HOST: Joi.string(),
        MYSQLDATABASE: Joi.string(),
        MYSQLPORT: Joi.number(),
        MYSQLPASSWORD: Joi.string(),
        MYSQLUSER: Joi.string(),
        MYSQLHOST: Joi.string(),
      })
        .or('MYSQL_URL', 'MYSQL_DATABASE_URL', 'MYSQL_DATABASE', 'MYSQLDATABASE')
        .or('MYSQL_URL', 'MYSQL_DATABASE_URL', 'MYSQL_PORT', 'MYSQLPORT')
        .or('MYSQL_URL', 'MYSQL_DATABASE_URL', 'MYSQL_PASSWORD', 'MYSQLPASSWORD')
        .or('MYSQL_URL', 'MYSQL_DATABASE_URL', 'MYSQL_USER', 'MYSQLUSER')
        .or('MYSQL_URL', 'MYSQL_DATABASE_URL', 'MYSQL_HOST', 'MYSQLHOST'),
    }),
    UsersModule,
    ProductsModule,
    HttpModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    /*{
      provide: 'TASKS',
      useFactory: async () => {
        const task = await axios({
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/todos',
        });
        return task.data;
      },
      inject: [HttpService],
    }, */
  ],
})
export class AppModule {}
