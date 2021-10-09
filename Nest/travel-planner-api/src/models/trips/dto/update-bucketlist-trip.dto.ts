import { PartialType } from '@nestjs/mapped-types';
import { CreateBucketlistTripDto } from './create-bucketlist-trip.dto';

export class UpdateTripDto extends PartialType(CreateBucketlistTripDto) {}
