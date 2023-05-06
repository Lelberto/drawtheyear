import { ClassSerializerInterceptor, Controller, Get, Req, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Request } from 'express';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';

@Controller('me')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UsePipes(ValidationPipe)
export class MeController {

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getProfile(@Req() req: Request) {
    return req.user;
  }
}
