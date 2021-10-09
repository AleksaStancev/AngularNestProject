import { Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtConfigModule } from 'src/configuration/jwt-config/jwt-config.module';
import { JwtConfigService } from 'src/configuration/jwt-config/jwt-config.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [JwtConfigModule],
      useFactory: async (jwtConfigService: JwtConfigService) => ({
        secret: jwtConfigService.secret,
        signOptions: {
          expiresIn: jwtConfigService.expiresAndMeasurementUnit,
        },
      }),
      inject: [JwtConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class JwtProviderModule {}
