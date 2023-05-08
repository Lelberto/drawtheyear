import { registerAs } from '@nestjs/config';

const config = () => ({
  path: process.env.LOG_PATH
});

export default registerAs('log', config);
