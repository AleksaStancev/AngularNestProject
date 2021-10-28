import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { SanitizeMongooseModelInterceptor } from 'nestjs-mongoose-exclude';
import { JwtCookieGuard } from 'src/common/guards/jwt-cookie.guard';
import { IId } from 'src/common/interfaces/id.interface';
import { CreateBucketlistTripDto } from './dto/create-bucketlist-trip.dto';
import { UpdateTripDto } from './dto/update-bucketlist-trip.dto';
import { TripsService } from './trips.service';

@Controller('trips')
export class TripsController {
  constructor(private readonly tripsService: TripsService) {}

  @UseInterceptors(
    new SanitizeMongooseModelInterceptor({
      excludeMongooseV: true,
      excludeMongooseId: false,
    }),
  )
  @UseGuards(JwtCookieGuard)
  @Post('createBucketlistTrip')
  async create(
    @Body() createTripDto: CreateBucketlistTripDto,
    @Req() request: Request,
  ) {
    return await this.tripsService.createBucketlistTrip(createTripDto, request);
  }
  @UseGuards(JwtCookieGuard)
  @Delete('deletetrip/:id')
  async delete(@Param('id') tripId: string, @Req() request: Request) {
    return await this.tripsService.remove(tripId, request);
  }

  @UseGuards(JwtCookieGuard)
  @Get('gettrips')
  async getTrips(@Req() request: Request) {
    return await this.tripsService.findAll(request);
  }

  @UseGuards(JwtCookieGuard)
  @Get('gettrip/:id')
  async getBucketlist(@Param('id') id: string) {
    return await this.tripsService.getTrip(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(+id, updateTripDto);
  }
}
