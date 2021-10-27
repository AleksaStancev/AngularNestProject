import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { JwtCookieGuard } from 'src/common/guards/jwt-cookie.guard';
import { UpdateUserCredentialsDto } from 'src/models/users/dto/update-user-credentials.dto';
import { UserCredentialsDto } from 'src/models/users/dto/user-credentials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(
    @Body() userCredentials: UserCredentialsDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<any> {
    return await this.authService.login(userCredentials, response);
  }

  @UseGuards(JwtCookieGuard)
  @Get('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    return this.authService.logout(response);
  }

  @UseGuards(JwtCookieGuard)
  @Put('updateusercredentials')
  async update(
    @Body() updateUserCredentialsDto: UpdateUserCredentialsDto,
    @Req() request: Request,
    @Res() response: Response,
  ) {
    await this.authService.updateCredentials(
      updateUserCredentialsDto,
      request,
      response,
    );
  }

  @Get('isloggedin')
  async isLoggedIn(@Req() request: Request, @Res() response: Response) {
    await this.authService.isLoggedIn(request, response);
  }
}
