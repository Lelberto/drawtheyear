import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { DayService } from './day.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';
import { ReqUser } from '../../common/decorators/request-user.decorator';
import { User } from '../users/entities/user.entity';
import { ResolveUserPipe } from '../../common/pipes/resolve-user.pipe';
import { CreateDayDTO } from './dto/day.dto';

@Controller('users/:username/days')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class UserDayController {

  private readonly dayService: DayService;

  public constructor(dayService: DayService) {
    this.dayService = dayService;
  }

  @Get()
  public async findAll(@ReqUser() authUser: User, @Param('username', ResolveUserPipe) user: User) {
    return await this.dayService.findAll(user);
  }

  @Get(':date')
  public async findByDate(@ReqUser() authUser: User, @Param('username', ResolveUserPipe) user: User, @Param('date') date: Date) {
    return await this.dayService.findByDate(user, date);
  }

  @Post()
  public async create(@ReqUser() authUser: User, @Param('username', ResolveUserPipe) user: User, @Body() body: CreateDayDTO) {
    return await this.dayService.create(user, body);
  }
}
