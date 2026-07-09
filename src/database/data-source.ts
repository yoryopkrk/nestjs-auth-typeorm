import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const getEnv = (...keys: string[]) => {
  for (const key of keys) {
    const value = process.env[key];
    if (value) {
      return value;
    }
  }

  return undefined;
};

const getPort = (...keys: string[]) => {
  const value = getEnv(...keys);

  return value ? parseInt(value, 10) : undefined;
};

const commonOptions = {
  synchronize: false,
  logging: false,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
};

const getDataSourceOptions = (): DataSourceOptions => {
  const dbType = getEnv('DB_TYPE', 'DATABASE_TYPE') || 'mysql';

  if (dbType === 'postgres') {
    const url = getEnv('POSTGRES_URL', 'POSTGRES_DATABASE_URL');

    if (url) {
      return {
        type: 'postgres',
        url,
        schema: getEnv('POSTGRES_SCHEMA'),
        ssl: getEnv('POSTGRES_SSL') === 'true',
        ...commonOptions,
      };
    }

    return {
      type: 'postgres',
      host: getEnv('POSTGRES_HOST', 'POSTGRESHOST'),
      port: getPort('POSTGRES_PORT', 'POSTGRESPORT'),
      username: getEnv('POSTGRES_USER', 'POSTGRESUSER'),
      password: getEnv('POSTGRES_PASSWORD', 'POSTGRESPASSWORD'),
      database: getEnv('POSTGRES_DATABASE', 'POSTGRESDATABASE'),
      ssl: getEnv('POSTGRES_SSL') === 'true',
      schema: getEnv('POSTGRES_SCHEMA'),
      ...commonOptions,
    };
  }

  const url = getEnv('MYSQL_URL', 'MYSQL_DATABASE_URL');

  if (url) {
    return {
      type: 'mysql',
      url,
      ...commonOptions,
    };
  }

  return {
    type: 'mysql',
    host: getEnv('MYSQL_HOST', 'MYSQLHOST'),
    port: getPort('MYSQL_PORT', 'MYSQLPORT'),
    username: getEnv('MYSQL_USER', 'MYSQLUSER'),
    password: getEnv('MYSQL_PASSWORD', 'MYSQLPASSWORD'),
    database: getEnv('MYSQL_DATABASE', 'MYSQLDATABASE'),
    ...commonOptions,
  };
};

export const AppDataSource = new DataSource(getDataSourceOptions());
