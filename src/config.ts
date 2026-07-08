import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    mysql: {
      dbName: process.env.MYSQL_DATABASE,
      port: parseInt(process.env.MYSQL_PORT, 10),
      password: process.env.MYSQL_PASSWORD,
      user: process.env.MYSQL_USER,
      host: process.env.MYSQL_HOST,
      url: process.env.MYSQL_URL,
    },
    apiKey: process.env.API_KEY,
    version: process.env.VERSION,
    jwtSecret: process.env.JWT_SECRET,
  };
});
