import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserCredentialsDto } from 'src/models/users/dto/user-credentials.dto';
import { UsersService } from 'src/models/users/users.service';
import { Response, Request } from 'express';
import { excMsg_wrongCredentials_const } from 'src/common/constants/exception-messages.constants';
import { JwtConfigService } from 'src/configuration/jwt-config/jwt-config.service';
import { AppConfigService } from 'src/configuration/app-config/app-config.service';
import { jwtCfg_defaultCookieName_const } from 'src/common/constants/jwt-config.constants';
import * as bcrypt from 'bcrypt';
import { UpdateUserCredentialsDto } from 'src/models/users/dto/update-user-credentials.dto';
import { IJwtPayload } from './interfaces/jwt-payload-interface';
import { UserDocument } from 'src/models/users/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly appConfigService: AppConfigService,
  ) {}

  async login(credentials: UserCredentialsDto, response: Response) {
    const user = await this.usersService.findOne(credentials.username);
    if (!user || !(await bcrypt.compare(credentials.password, user.password)))
      throw new UnauthorizedException(excMsg_wrongCredentials_const);

    this.sendResponseWithCookie(user, response);
  }

  async logout(response: Response) {
    response
      .cookie(jwtCfg_defaultCookieName_const, null, {
        httpOnly: true,
        domain: this.appConfigService.domain,
        expires: new Date(Date.now()),
      })
      .status(200)
      .send();
  }

  async isLoggedIn(request: Request, response: Response) {
    response
      .status(200)
      .send(await this.usersService.isLoggedIn(request, response));
  }

  async updateCredentials(
    updateUserCredentialsDto: UpdateUserCredentialsDto,
    request: Request,
    response: Response,
  ) {
    const newCredentials = await this.usersService.update(
      updateUserCredentialsDto,
      request,
    );

    this.sendResponseWithCookie(newCredentials, response);
  }

  private sendResponseWithCookie(user: UserDocument, response: Response) {
    const payload: IJwtPayload = { username: user.username, userId: user.id };
    const token = this.jwtService.sign(payload);
    response
      .cookie(jwtCfg_defaultCookieName_const, token, {
        httpOnly: true,
        domain: this.appConfigService.domain,
        expires: new Date(
          Date.now() + 1000 * 60 * 60 * this.jwtConfigService.expires,
        ),
      })
      .status(200)
      .send();
  }
}
