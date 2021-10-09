import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { TripPhase } from 'src/common/enumerations/trip-phase.enumeration';
import { UserRepository } from '../users/user.repository';
import { UsersService } from '../users/users.service';
import { CreateBucketlistTripDto } from './dto/create-bucketlist-trip.dto';
import { UpdateTripDto } from './dto/update-bucketlist-trip.dto';
import { Trip, TripSchema } from './schema/trip.schema';
import { TripRepository } from './trip.repository';
import { Request } from 'express';
import { Types } from 'mongoose';

@Injectable()
export class TripsService {
  constructor(
    private tripRepository: TripRepository,
    private usersService: UsersService,
  ) {}
  public async createBucketlistTrip(
    createTripDto: CreateBucketlistTripDto,
    request: Request,
  ): Promise<Trip> {
    const user = await this.usersService.findOneFromCookie(request);
    if (!user) throw new InternalServerErrorException();
    return await this.tripRepository.create({
      user: user,
      tripPhase: TripPhase.bucketList,
      tripName: createTripDto.tripName,
      ...createTripDto,
    });
  }

  findAll() {
    return `This action returns all trips`;
  }

  findOne(id: number) {
    return `This action returns a #${id} trip`;
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return `This action updates a #${id} trip`;
  }

  async remove(tripId: string, request: Request) {
    const trip = await this.tripRepository.findOne({
      _id: new Types.ObjectId(tripId),
    });

    const user = await this.usersService.findOneFromCookie(request);

    if (
      !trip ||
      (await trip.populate('user')).user.username !== user.username ||
      !(await this.tripRepository.deleteOne({ trip }))
    )
      throw new BadRequestException();
  }
}
