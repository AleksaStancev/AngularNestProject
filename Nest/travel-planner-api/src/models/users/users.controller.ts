import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtCookieGuard } from 'src/common/guards/jwt-cookie.guard';
import { UpdateUserCredentialsDto } from './dto/update-user-credentials.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  async create(@Body() userCredentialsDto: UserCredentialsDto) {
    await this.usersService.create(userCredentialsDto);
  }

  @UseGuards(JwtCookieGuard)
  @Delete('delete')
  async remove(@Req() request: Request, @Res() response: Response) {
    await this.usersService.remove(request, response);
  }
}
