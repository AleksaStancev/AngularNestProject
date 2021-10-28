import { forwardRef, Module } from '@nestjs/common';
import { TripsService } from './trips.service';
import { TripsController } from './trips.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './schema/trip.schema';
import { TripRepository } from './trip.repository';
import { UserRepository } from '../users/user.repository';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
    forwardRef(() => UsersModule),
  ],
  controllers: [TripsController],
  providers: [TripsService, TripRepository],
  exports: [
    TripRepository,
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
  ],
})
export class TripsModule {}
