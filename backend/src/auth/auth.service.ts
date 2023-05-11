import { Injectable } from '@nestjs/common';
import { UserService } from '../models/users/user.service';
import { User } from '../models/users/entities/user.entity';
import { CryptoService } from '../crypto/crypto.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenPayload, RefreshTokenPayload } from '../common/constants/jwt.constants';
import { ApplicationService } from '../models/applications/application.service';

@Injectable()
export class AuthService {

  private readonly applicationService: ApplicationService;
  private readonly userService: UserService;
  private readonly cryptoService: CryptoService;
  private readonly jwtService: JwtService;

  public constructor(
    applicationService: ApplicationService,
    userService: UserService,
    cryptoService: CryptoService,
    jwtService: JwtService
  ) {
    this.applicationService = applicationService;
    this.userService = userService;
    this.cryptoService = cryptoService;
    this.jwtService = jwtService;
  }

  public async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (user && await this.cryptoService.compare(password, user.password)) {
      return user;
    }
  }

  public async login(user: User) {
    const accessTokenPayload: AccessTokenPayload = { email: user.email, sub: user.id };
    const refreshTokenPayload: RefreshTokenPayload = { email: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(accessTokenPayload),
      refresh_token: await this.jwtService.signAsync(refreshTokenPayload)
    }
  }

  public async getCallbackUrl(appId: number): Promise<string> {
    const app = await this.applicationService.findById(appId);
    return app?.loginCallbackUrl;
  }
}
