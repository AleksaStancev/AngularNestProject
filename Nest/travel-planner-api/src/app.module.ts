import { Module } from '@nestjs/common';
import { AuthModule } from './authentication/auth.module';
import { AppConfigModule } from './configuration/app-config/app-config.module';
import { TripsModule } from './models/trips/trips.module';
import { UsersModule } from './models/users/users.module';
import { MongoProviderModule } from './providers/database/mongo-provider/mongo-provider.module';

@Module({
  imports: [
    AppConfigModule,
    MongoProviderModule,
    UsersModule,
    TripsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
