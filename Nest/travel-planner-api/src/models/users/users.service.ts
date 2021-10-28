import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { bcrypt_defaultRounds } from 'src/common/constants/bcrypt.constants';
import { excMsg_usernameAlreadyExists_const } from 'src/common/constants/exception-messages.constants';
import { jwtCfg_defaultCookieName_const } from 'src/common/constants/jwt-config.constants';
import { CookieHelper } from 'src/common/helpers/cookie.helper';
import { AppConfigService } from 'src/configuration/app-config/app-config.service';
import { TripRepository } from '../trips/trip.repository';
import { UpdateUserCredentialsDto } from './dto/update-user-credentials.dto';
import { UserCredentialsDto } from './dto/user-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tripsRepository: TripRepository,
    private readonly jwtService: JwtService,
    private readonly appConfigService: AppConfigService,
  ) {}
  async create(createUserDto: UserCredentialsDto) {
    if (await this.findOne(createUserDto.username))
      throw new BadRequestException(excMsg_usernameAlreadyExists_const);

    if (
      !(await this.userRepository.create({
        ...createUserDto,
        password: await bcrypt.hash(
          createUserDto.password,
          bcrypt_defaultRounds,
        ),
      }))
    )
      throw new InternalServerErrorException();
  }
  findOne(username: string) {
    return this.userRepository.findOne({ username: username });
  }

  findOneFromCookie(request: Request) {
    const username = CookieHelper.getUsernameFromCookie(
      request,
      this.jwtService,
    );
    return username !== '' ? this.findOne(username) : null;
  }

  async update(
    updateUserCredentialsDto: UpdateUserCredentialsDto,
    request: Request,
  ) {
    const username = CookieHelper.getUsernameFromCookie(
      request,
      this.jwtService,
    );
    let nullFreeUserCredentials = { ...updateUserCredentialsDto };

    if (updateUserCredentialsDto.password === undefined)
      delete nullFreeUserCredentials.password;
    else
      nullFreeUserCredentials.password = await bcrypt.hash(
        nullFreeUserCredentials.password,
        bcrypt_defaultRounds,
      );

    if (updateUserCredentialsDto.username === undefined)
      delete nullFreeUserCredentials.username;
    else if (await this.findOne(nullFreeUserCredentials.username))
      throw new BadRequestException(excMsg_usernameAlreadyExists_const);

    const newCredentials = await this.userRepository.findAndUpdateOne(
      {
        username: username,
      },
      nullFreeUserCredentials,
    );

    if (!newCredentials) throw new InternalServerErrorException();
    return newCredentials;
  }

  async remove(request: Request, response: Response) {
    const user = await this.findOneFromCookie(request);
    if (!(await this.tripsRepository.deleteMany({ user: user._id })))
      throw new BadRequestException();
    if (!(await this.userRepository.deleteOne({ username: user.username })))
      throw new BadRequestException();
    response
      .cookie(jwtCfg_defaultCookieName_const, null, {
        httpOnly: true,
        domain: this.appConfigService.domain,
        expires: new Date(Date.now()),
      })
      .send();
  }

  async isLoggedIn(request: Request, response: Response): Promise<boolean> {
    return (await this.findOneFromCookie(request)) != null;
  }
}
