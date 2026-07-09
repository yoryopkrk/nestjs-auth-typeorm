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
        DEMO_USER_EMAIL: Joi.string().email(),
        DEMO_USER_PASSWORD: Joi.string(),
        PORT: Joi.number(),
        DB_TYPE: Joi.string().valid('mysql', 'postgres'),
        DATABASE_TYPE: Joi.string().valid('mysql', 'postgres'),
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
        POSTGRES_URL: Joi.string(),
        POSTGRES_DATABASE_URL: Joi.string(),
        POSTGRES_DATABASE: Joi.string(),
        POSTGRES_PORT: Joi.number(),
        POSTGRES_PASSWORD: Joi.string(),
        POSTGRES_USER: Joi.string(),
        POSTGRES_HOST: Joi.string(),
        POSTGRES_SCHEMA: Joi.string(),
        POSTGRES_SSL: Joi.boolean(),
        POSTGRESDATABASE: Joi.string(),
        POSTGRESPORT: Joi.number(),
        POSTGRESPASSWORD: Joi.string(),
        POSTGRESUSER: Joi.string(),
        POSTGRESHOST: Joi.string(),
      }).custom((env) => {
        const dbType = env.DB_TYPE || env.DATABASE_TYPE || 'mysql';
        const databaseConfig = {
          mysql: {
            urls: ['MYSQL_URL', 'MYSQL_DATABASE_URL'],
            fields: [
              ['MYSQL_DATABASE', 'MYSQLDATABASE'],
              ['MYSQL_PORT', 'MYSQLPORT'],
              ['MYSQL_PASSWORD', 'MYSQLPASSWORD'],
              ['MYSQL_USER', 'MYSQLUSER'],
              ['MYSQL_HOST', 'MYSQLHOST'],
            ],
          },
          postgres: {
            urls: ['POSTGRES_URL', 'POSTGRES_DATABASE_URL'],
            fields: [
              ['POSTGRES_DATABASE', 'POSTGRESDATABASE'],
              ['POSTGRES_PORT', 'POSTGRESPORT'],
              ['POSTGRES_PASSWORD', 'POSTGRESPASSWORD'],
              ['POSTGRES_USER', 'POSTGRESUSER'],
              ['POSTGRES_HOST', 'POSTGRESHOST'],
            ],
          },
        }[dbType];

        const hasUrl = databaseConfig.urls.some((key) => env[key]);
        const missingFields = databaseConfig.fields.filter(
          (keys) => !keys.some((key) => env[key]),
        );

        if (!hasUrl && missingFields.length) {
          const missingNames = missingFields
            .map((keys) => keys.join(' or '))
            .join(', ');

          throw new Error(
            `${dbType} config needs one database URL or these fields: ${missingNames}`,
          );
        }

        return env;
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
