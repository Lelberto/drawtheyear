import { registerAs } from '@nestjs/config';

const config = () => ({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  db: process.env.DB_NAME
});

export default registerAs('database', config);
