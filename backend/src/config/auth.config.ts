import { registerAs } from '@nestjs/config';

const config = () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: parseInt(process.env.JWT_EXPIRATION)
  }
});

export default registerAs('auth', config);
