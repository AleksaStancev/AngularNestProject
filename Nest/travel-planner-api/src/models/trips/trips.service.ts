import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request } from 'express';
import { Types } from 'mongoose';
import { TripPhase } from 'src/common/enumerations/trip-phase.enumeration';
import { UsersService } from '../users/users.service';
import { CreateBucketlistTripDto } from './dto/create-bucketlist-trip.dto';
import { UpdateTripDto } from './dto/update-bucketlist-trip.dto';
import { TripRepository } from './trip.repository';

@Injectable()
export class TripsService {
  constructor(
    private tripRepository: TripRepository,
    private usersService: UsersService,
  ) {}
  public async createBucketlistTrip(
    createTripDto: CreateBucketlistTripDto,
    request: Request,
  ) {
    const user = await this.usersService.findOneFromCookie(request);
    if (!user) throw new InternalServerErrorException();
    const createdTrip = await this.tripRepository.create({
      user: user,
      tripPhase: TripPhase.bucketList,
      tripName: createTripDto.tripName,
      ...createTripDto,
    });
    return {
      id: createdTrip.id,
      tripName: createdTrip.tripName,
      destinationCountry: createdTrip.destinationCountry,
      destinationInCountry: createdTrip.destinationInCountry,
      bucketlistNotes: createdTrip.bucketlistNotes,
      tripPhase: createdTrip.tripPhase,
    };
  }

  async findAll(request: Request) {
    const user = await this.usersService.findOneFromCookie(request);
    if (!user) throw new InternalServerErrorException();
    const trips = await this.tripRepository.find({ user: user._id });
    return trips.map((createdTrip) => ({
      id: createdTrip.id,
      tripName: createdTrip.tripName,
      tripPhase: createdTrip.tripPhase,
      fetched: false,
      bucketlistNotes: '',
      destinationInCountry: '',
      destinationCountry: '',
    }));
  }

  async getTrip(id: string) {
    const foundTrip = await this.tripRepository.findOne({
      _id: new Types.ObjectId(id),
    });
    return {
      id: foundTrip.id,
      tripName: foundTrip.tripName,
      destinationCountry: foundTrip.destinationCountry,
      destinationInCountry: foundTrip.destinationInCountry,
      bucketlistNotes: foundTrip.bucketlistNotes,
      tripPhase: foundTrip.tripPhase,
      fetched: true,
    };
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
