import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { jwtCfg_defaultCookieName_const } from '../constants/jwt-config.constants';
export class CookieHelper {
  static getUsernameFromCookie(
    request: Request,
    jwtService: JwtService,
  ): string {
    const cookie = request.cookies[jwtCfg_defaultCookieName_const];
    return cookie == null ? '' : jwtService.decode(cookie)['username'];
  }
}
