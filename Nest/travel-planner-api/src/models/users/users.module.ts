import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigModule } from 'src/configuration/app-config/app-config.module';
import { JwtProviderModule } from 'src/providers/jwt-provider/jwt-provider.module';
import { TripRepository } from '../trips/trip.repository';
import { TripsModule } from '../trips/trips.module';
import { User, UserSchema } from './schema/user.schema';
import { UserRepository } from './user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtProviderModule,
    AppConfigModule,
    forwardRef(() => TripsModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, TripRepository],
  exports: [
    UsersService,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class UsersModule {}
