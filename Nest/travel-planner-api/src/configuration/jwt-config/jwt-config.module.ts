import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfigService } from './jwt-config.service';
import JwtConfiguration from './jwt-config.configuration';
import * as Joi from 'joi';
import {
  jwtCfg_defaultExpires_const,
  jwtCft_defaultMeasurementUnit_const,
} from 'src/common/constants/jwt-config.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [JwtConfiguration],
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string(),
        JWT_EXPIRES: Joi.number().default(jwtCfg_defaultExpires_const),
        JWT_EXPIRES_MEASUREMENT_UNIT: Joi.string().default(
          jwtCft_defaultMeasurementUnit_const,
        ),
      }),
      validationOptions: { abortEarly: true },
    }),
  ],
  providers: [ConfigService, JwtConfigService],
  exports: [ConfigService, JwtConfigService],
})
export class JwtConfigModule {}
