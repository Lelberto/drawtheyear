import { Body, ClassSerializerInterceptor, Controller, Get, Patch, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReqUser } from '../../common/decorators/request-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';
import { UpdateUserDTO } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('me')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class MeController {

  private readonly userService: UserService;

  public constructor(userService: UserService) {
    this.userService = userService;
  }

  @Get()
  public async getProfile(@ReqUser() authUser: User) {
    return authUser;
  }

  @Patch()
  public async update(@ReqUser() authUser: User, @Body() dto: UpdateUserDTO) {
    await this.userService.update(authUser, dto);
  }
}
