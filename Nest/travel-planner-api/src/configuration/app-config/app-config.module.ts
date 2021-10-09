import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import AppConfiguration from './app-config.configuration';
import { AppConfigService } from './app-config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  appCfg_DefaultEnv_const,
  appCfg_DefaultName_const,
  appCfg_DefaultPort_const,
  appCfg_DefaultDomain_const,
  appCfg_ValidEnvs_const,
} from '../../common/constants/app-config.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfiguration],
      validationSchema: Joi.object({
        APP_NAME: Joi.string().default(appCfg_DefaultName_const),
        APP_ENV: Joi.string()
          .valid(...appCfg_ValidEnvs_const)
          .default(appCfg_DefaultEnv_const),
        APP_DOMAIN: Joi.string().default(appCfg_DefaultDomain_const),
        APP_PORT: Joi.number().default(appCfg_DefaultPort_const),
      }),
      validationOptions: { abortEarly: true },
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
