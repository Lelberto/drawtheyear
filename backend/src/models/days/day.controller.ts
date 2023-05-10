import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReqUser } from '../../common/decorators/request-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';
import { User } from '../users/entities/user.entity';
import { DayService } from './day.service';
import { CreateDayDTO } from './dto/day.dto';
import { AbilityFactory } from '../../casl/ability.factory';
import { Action } from '../../casl/action.enum';
import { Day } from './entities/day.entity';
import { DateHelper } from './date.helper';

@Controller('days')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class DayController {

  private readonly dayService: DayService;
  private readonly dateHelper: DateHelper;
  private readonly abilityFactory: AbilityFactory;

  public constructor(dayService: DayService, dateHelper: DateHelper, abilityFactory: AbilityFactory) {
    this.dayService = dayService;
    this.dateHelper = dateHelper;
    this.abilityFactory = abilityFactory;
  }

  @Get()
  public async findAll(@ReqUser() authUser: User) {
    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.READ, Day)) {
      throw new UnauthorizedException();
    }
    return await this.dayService.findAll(authUser);
  }

  @Get(':date')
  public async findByDate(@ReqUser() authUser: User, @Param('date') date: Date) {
    const ability = this.abilityFactory.createForUser(authUser);
    const day = await this.dayService.findByDate(authUser, date);
    if (ability.cannot(Action.READ, day)) {
      throw new UnauthorizedException();
    }
    return day;
  }

  @Post()
  public async create(@ReqUser() authUser: User, @Body() body: CreateDayDTO) {
    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.CREATE, Day)) {
      throw new UnauthorizedException();
    }
    if (await this.dayService.exists(authUser, body.date)) {
      throw new BadRequestException(`Day "${body.date}" already exists`);
    }
    if (!this.dateHelper.isValid(body.date)) {
      throw new BadRequestException(`Day "${body.date} is not valid"`);
    }
    return await this.dayService.create(authUser, body);
  }
}
