import { registerAs } from '@nestjs/config';

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

export default registerAs('config', () => {
  const dbType = getEnv('DB_TYPE', 'DATABASE_TYPE') || 'mysql';

  return {
    database: {
      type: dbType,
    },
    mysql: {
      dbName: getEnv('MYSQL_DATABASE', 'MYSQLDATABASE'),
      port: getPort('MYSQL_PORT', 'MYSQLPORT'),
      password: getEnv('MYSQL_PASSWORD', 'MYSQLPASSWORD'),
      user: getEnv('MYSQL_USER', 'MYSQLUSER'),
      host: getEnv('MYSQL_HOST', 'MYSQLHOST'),
      url: getEnv('MYSQL_URL', 'MYSQL_DATABASE_URL'),
    },
    postgres: {
      dbName: getEnv('POSTGRES_DATABASE', 'POSTGRESDATABASE'),
      port: getPort('POSTGRES_PORT', 'POSTGRESPORT'),
      password: getEnv('POSTGRES_PASSWORD', 'POSTGRESPASSWORD'),
      user: getEnv('POSTGRES_USER', 'POSTGRESUSER'),
      host: getEnv('POSTGRES_HOST', 'POSTGRESHOST'),
      url: getEnv('POSTGRES_URL', 'POSTGRES_DATABASE_URL'),
      schema: getEnv('POSTGRES_SCHEMA'),
      ssl: getEnv('POSTGRES_SSL') === 'true',
    },
    apiKey: process.env.API_KEY,
    version: process.env.VERSION,
    jwtSecret: process.env.JWT_SECRET,
    demoUser: {
      email: getEnv('DEMO_USER_EMAIL'),
      password: getEnv('DEMO_USER_PASSWORD'),
    },
  };
});
