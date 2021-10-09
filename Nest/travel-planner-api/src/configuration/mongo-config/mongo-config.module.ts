import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import MongoConfiguration from './mongo-config.configuration';
import { MongoConfigService } from './mongo-config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [MongoConfiguration],
      validationSchema: Joi.object({
        MONGODB_URL: Joi.string(),
      }),
      validationOptions: { abortEarly: true },
    }),
  ],
  providers: [MongoConfigService, ConfigService],
  exports: [ConfigService, MongoConfigService],
})
export class MongoConfigModule {}
