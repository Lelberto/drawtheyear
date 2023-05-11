import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule } from '../models/users/user.module';
import { CryptoModule } from '../crypto/crypto.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService, ConfigType } from '@nestjs/config';
import authConfig from '../config/auth.config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { ApplicationModule } from '../models/applications/application.module';

@Module({
  imports: [
    ApplicationModule,
    UserModule,
    CryptoModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<ConfigType<typeof authConfig>>('auth').jwt.secret,
        signOptions: { expiresIn: config.get<ConfigType<typeof authConfig>>('auth').jwt.expiration }
      }),
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, GoogleStrategy],
  controllers: [AuthController],
  exports: []
})
export class AuthModule {}
