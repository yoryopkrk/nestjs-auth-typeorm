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
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
        VERSION: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        MYSQL_DATABASE: Joi.string().required(),
        MYSQL_PORT: Joi.number().required(),
        MYSQL_ROOT_PASSWORD: Joi.string().required(),
        MYSQL_USER: Joi.string().required(),
        MYSQL_HOST: Joi.string().required(),
      }),
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
