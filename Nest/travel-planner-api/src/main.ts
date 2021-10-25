import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { AppConfigService } from './configuration/app-config/app-config.service';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const appConfig: AppConfigService =
    app.get<AppConfigService>(AppConfigService);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(cookieParser());
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });
  await app.listen(appConfig.port);
}
bootstrap();
