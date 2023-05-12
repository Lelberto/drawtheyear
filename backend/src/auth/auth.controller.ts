import { BadRequestException, Controller, Get, Post, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ReqUser } from '../common/decorators/request-user.decorator';
import { GoogleAuthGuard } from '../common/guards/google-auth.guard';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { User } from '../models/users/entities/user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

  private readonly authService: AuthService;

  public constructor(authService: AuthService) {
    this.authService = authService;
  }

  @Post('local')
  @UseGuards(LocalAuthGuard)
  public async localLogin(@Req() req: Request) {
    return await this.authService.login(req.user as User);
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  public async googleLogin() {
    // Google authentication trigger
  }

  @Get('google/callback')
  @UseGuards(GoogleAuthGuard)
  public async googleLoginCallback(
    @ReqUser() user: any,
    @Query('state') state: string,
    @Res({ passthrough: true }) res: Response
  ) {
    const stateQuery = new URLSearchParams(state);
    const appId = stateQuery.get('appId');
    const tokens = await this.authService.login(user);
    if (appId) {
      const callbackUrl = await this.authService.getCallbackUrl(parseInt(appId));
      if (!callbackUrl) {
        throw new BadRequestException(`Invalid application ID "${appId}"`);
      }
      const params = new URLSearchParams();
      params.set('access_token', tokens.access_token);
      params.set('refresh_token', tokens.refresh_token);
      return res.redirect(`${callbackUrl}?${params.toString()}`);
    }
    return tokens;
  }
}
