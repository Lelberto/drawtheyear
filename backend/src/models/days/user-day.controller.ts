import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { DayService } from './day.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';
import { ReqUser } from '../../common/decorators/request-user.decorator';
import { User } from '../users/entities/user.entity';
import { ResolveUserPipe } from '../../common/pipes/resolve-user.pipe';
import { CreateDayDTO } from './dto/day.dto';
import { AbilityFactory } from '../../casl/ability.factory';
import { Action } from '../../casl/action.enum';
import { Day } from './entities/day.entity';

@Controller('users/:username/days')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class UserDayController {

  private readonly dayService: DayService;
  private readonly abilityFactory: AbilityFactory;

  public constructor(dayService: DayService, abilityFactory: AbilityFactory) {
    this.dayService = dayService;
    this.abilityFactory = abilityFactory;
  }

  @Get()
  public async findAll(@ReqUser() authUser: User, @Param('username', ResolveUserPipe) user: User) {
    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.READ, user) || ability.cannot(Action.READ, Day)) {
      throw new UnauthorizedException();
    }
    return await this.dayService.findAll(user);
  }

  @Get(':date')
  public async findByDate(@ReqUser() authUser: User, @Param('username', ResolveUserPipe) user: User, @Param('date') date: Date) {
    const ability = this.abilityFactory.createForUser(authUser);
    const day = await this.dayService.findByDate(user, date);
    if (ability.cannot(Action.READ, user) || ability.cannot(Action.READ, day)) {
      throw new UnauthorizedException();
    }
    return day;
  }

  @Post()
  public async create(@ReqUser() authUser: User, @Param('username', ResolveUserPipe) user: User, @Body() body: CreateDayDTO) {
    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.UPDATE, user) || ability.cannot(Action.CREATE, Day)) {
      throw new UnauthorizedException();
    }
    return await this.dayService.create(user, body);
  }
}
