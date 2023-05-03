import { registerAs } from '@nestjs/config';

const config = () => ({
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  db: process.env.POSTGRES_DB
});

export default registerAs('database', config);
