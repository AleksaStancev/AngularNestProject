import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoConfigModule } from '../../../configuration/mongo-config/mongo-config.module';
import { MongoConfigService } from '../../../configuration/mongo-config/mongo-config.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoConfigModule],
      useFactory: async (mongoConfigService: MongoConfigService) => ({
        uri: mongoConfigService.url,
      }),
      inject: [MongoConfigService]
    }),
  ],
})
export class MongoProviderModule {}
