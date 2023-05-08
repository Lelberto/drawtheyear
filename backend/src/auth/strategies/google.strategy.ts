import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import authConfig from '../../config/auth.config';
import { User } from '../../models/users/entities/user.entity';
import { UserService } from '../../models/users/user.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  private readonly userService: UserService;

  public constructor(
    @Inject(authConfig.KEY) config: ConfigType<typeof authConfig>,
    userService: UserService
  ) {
    super({
      clientID: config.google.clientId,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackUrl,
      scope: ['email', 'profile']
    });
    this.userService = userService;
  }

  public async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<User> {
    const { emails, displayName } = profile;
    const email = emails[0].value;
    let user = await this.userService.findByEmail(email);
    if (!user) {
      user = await this.userService.create({ email, username: displayName, displayName });
    }
    return user;
  }
}
