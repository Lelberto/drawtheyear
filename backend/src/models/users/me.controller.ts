import { Body, ClassSerializerInterceptor, Controller, Get, Patch, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReqUser } from '../../common/decorators/request-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';
import { UpdateUserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('me')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UsePipes(ValidationPipe)
export class MeController {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  public async getProfile(@ReqUser() user: User) {
    return user;
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  public async update(@ReqUser('username') username: string, @Body() dto: UpdateUserDTO) {
    await this.userService.update(username, dto);
  }
}
