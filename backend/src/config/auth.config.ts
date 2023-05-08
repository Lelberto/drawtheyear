import { registerAs } from '@nestjs/config';

const config = () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiration: parseInt(process.env.JWT_EXPIRATION)
  },
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackUrl: process.env.GOOGLE_CALLBACK_URL
  }
});

export default registerAs('auth', config);
