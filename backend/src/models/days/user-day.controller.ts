import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Post, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AbilityFactory } from '../../casl/ability.factory';
import { Action } from '../../casl/action.enum';
import { ReqUser } from '../../common/decorators/request-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';
import { ResolveEmotionPipe } from '../../common/pipes/resolve-emotion.pipe';
import { ResolveUserPipe } from '../../common/pipes/resolve-user.pipe';
import { Emotion } from '../emotions/entities/emotion.entity';
import { User } from '../users/entities/user.entity';
import { DayService } from './day.service';
import { AddEmotionDTO, CreateDayDTO, RemoveEmotionDTO } from './dto/day.dto';
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
    if (!day) {
      throw new NotFoundException(`Day "${date}" not found`);
    }
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

  @Post(':date/emotions')
  public async addEmotion(
    @ReqUser() authUser: User,
    @Param('username', ResolveUserPipe) user: User,
    @Param('date') date: Date,
    @Body() body: AddEmotionDTO,
    @Body('emotionId', ResolveEmotionPipe) emotion: Emotion
  ) {
    const day = await this.dayService.findByDate(user, date);
    if (!day) {
      throw new NotFoundException(`Day "${date}" not found`);
    }

    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.UPDATE, day) || ability.cannot(Action.UPDATE, emotion)) {
      throw new UnauthorizedException();
    }

    return await this.dayService.addEmotion(day, emotion);
  }

  @Delete(':date/emotions')
  public async removeEmotion(
    @ReqUser() authUser: User,
    @Param('username', ResolveUserPipe) user: User,
    @Param('date') date: Date,
    @Body() body: RemoveEmotionDTO,
    @Body('emotionId', ResolveEmotionPipe) emotion: Emotion
  ) {
    const day = await this.dayService.findByDate(user, date);
    if (!day) {
      throw new NotFoundException(`Day "${date}" not found`);
    }

    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.UPDATE, day) || ability.cannot(Action.UPDATE, emotion)) {
      throw new UnauthorizedException();
    }

    return await this.dayService.removeEmotion(day, emotion);
  }
}
