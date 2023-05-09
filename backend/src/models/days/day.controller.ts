import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReqUser } from '../../common/decorators/request-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';
import { User } from '../users/entities/user.entity';
import { DayService } from './day.service';
import { CreateDayDTO } from './dto/day.dto';

@Controller('days')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class DayController {

  private readonly dayService: DayService;

  public constructor(dayService: DayService) {
    this.dayService = dayService;
  }

  @Get()
  public async findAll(@ReqUser() authUser: User) {
    return await this.dayService.findAll(authUser);
  }

  @Get(':date')
  public async findByDate(@ReqUser() authUser: User, @Param('date') date: Date) {
    return await this.dayService.findByDate(authUser, date)
  }

  @Post()
  public async create(@ReqUser() authUser: User, @Body() body: CreateDayDTO) {
    return await this.dayService.create(authUser, body);
  }
}
