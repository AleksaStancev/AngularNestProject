import { registerAs } from '@nestjs/config';
export default registerAs('app', () => ({
  env: process.env.APP_ENV,
  name: process.env.APP_NAME,
  domain: process.env.APP_DOMAIN,
  port: process.env.APP_PORT,
}));
