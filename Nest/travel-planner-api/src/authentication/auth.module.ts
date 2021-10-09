import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AppConfigModule } from 'src/configuration/app-config/app-config.module';
import { JwtConfigModule } from 'src/configuration/jwt-config/jwt-config.module';
import { UsersModule } from 'src/models/users/users.module';
import { UsersService } from 'src/models/users/users.service';
import { JwtProviderModule } from 'src/providers/jwt-provider/jwt-provider.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtCookieStrategy } from './strategies/jwt-cookie.strategy';

@Module({
  imports: [
    PassportModule,
    JwtConfigModule,
    AppConfigModule,
    JwtProviderModule,
    UsersModule,
  ],
  providers: [AuthService, JwtCookieStrategy],
  controllers: [AuthController],
  exports: [],
})
export class AuthModule {}
