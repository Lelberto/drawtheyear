import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import authConfig from '../../config/auth.config';
import { ConfigType } from '@nestjs/config';
import { User } from '../../models/users/entities/user.entity';
import { AccessTokenPayload } from '../../common/constants/jwt.constants';
import { UserService } from '../../models/users/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

  private readonly userService: UserService;

  public constructor(
    userService: UserService,
    @Inject(authConfig.KEY) config: ConfigType<typeof authConfig>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: config.jwt.expiration < 0,
      secretOrKey: config.jwt.secret
    });
    this.userService = userService;
  }

  public async validate(payload: AccessTokenPayload): Promise<User> {
    const user = await this.userService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid access token');
    }
    return user;
  }
}
