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

export default registerAs('config', () => {
  return {
    mysql: {
      dbName: getEnv('MYSQL_DATABASE', 'MYSQLDATABASE'),
      port: parseInt(getEnv('MYSQL_PORT', 'MYSQLPORT'), 10),
      password: getEnv('MYSQL_PASSWORD', 'MYSQLPASSWORD'),
      user: getEnv('MYSQL_USER', 'MYSQLUSER'),
      host: getEnv('MYSQL_HOST', 'MYSQLHOST'),
      url: getEnv('MYSQL_URL', 'MYSQL_DATABASE_URL'),
    },
    apiKey: process.env.API_KEY,
    version: process.env.VERSION,
    jwtSecret: process.env.JWT_SECRET,
  };
});
