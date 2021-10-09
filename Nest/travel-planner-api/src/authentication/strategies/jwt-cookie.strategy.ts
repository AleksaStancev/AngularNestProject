import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JwtConfigService } from 'src/configuration/jwt-config/jwt-config.service';
import { jwtCfg_defaultCookieName_const } from 'src/common/constants/jwt-config.constants';

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtConfigServis: JwtConfigService) {
    super({
      jwtFromRequest: (request: Request) => {
        if (!request || !request.cookies) return null;
        return request.cookies[jwtCfg_defaultCookieName_const];
      },
      ignoreExpiration: false,
      secretOrKey: jwtConfigServis.secret,
    });
  }

  async validate(data: any): Promise<any> {
    return true;
  }
}
