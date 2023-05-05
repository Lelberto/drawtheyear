import { ClassSerializerInterceptor, Controller, Get, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('me')
@UseInterceptors(ClassSerializerInterceptor)
export class MeController {

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getProfile(@Req() req: Request) {
    return req.user;
  }
}
