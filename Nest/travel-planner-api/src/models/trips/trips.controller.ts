import {
  Body, Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
  UseInterceptors
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
  @Delete('deletetrip')
  async delete(@Body() tripId: IId, @Req() request: Request) {
    return await this.tripsService.remove(tripId.id, request);
  }

  @Get()
  findAll() {
    return this.tripsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tripsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.tripsService.update(+id, updateTripDto);
  }
}
