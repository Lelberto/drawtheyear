import { registerAs } from '@nestjs/config';

const config = () => ({
  startDate: '2017-01-01'
});

export default registerAs('days', config);
