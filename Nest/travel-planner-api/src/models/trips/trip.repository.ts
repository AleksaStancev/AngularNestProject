import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EntityRepository } from '../entity.repository';
import { Trip, TripDocument } from './schema/trip.schema';

@Injectable()
export class TripRepository extends EntityRepository<TripDocument> {
  constructor(@InjectModel(Trip.name) private tripModel: Model<TripDocument>) {
    super(tripModel);
  }
}
