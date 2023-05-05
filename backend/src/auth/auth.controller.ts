import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../common/guards/local-auth.guard';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from '../common/guards/google-auth.guard';
import { Request } from 'express';
import { User } from '../models/users/entities/user.entity';

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
  public async googleLoginCallback(@Req() req: Request) {
    return await this.authService.login(req.user as User);
  }
}
