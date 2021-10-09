import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  expires: process.env.JWT_EXPIRES,
  measurementUnit: process.env.JWT_EXPIRES_MEASUREMENT_UNIT,
}));
