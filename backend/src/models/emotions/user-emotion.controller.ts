import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AbilityFactory } from '../../casl/ability.factory';
import { ReqUser } from '../../common/decorators/request-user.decorator';
import { ResolveUserPipe } from '../../common/pipes/resolve-user.pipe';
import { User } from '../users/entities/user.entity';
import { EmotionService } from './emotion.service';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Action } from '../../casl/action.enum';
import { Emotion } from './entities/emotion.entity';
import { CreateEmotionDTO } from './dto/emotion.dto';

@Controller('users/:username/emotions')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class UserEmotionController {

  private readonly emotionService: EmotionService;
  private readonly abilityFactory: AbilityFactory;

  public constructor(emotionService: EmotionService, abilityFactory: AbilityFactory) {
    this.emotionService = emotionService;
    this.abilityFactory = abilityFactory;
  }

  @Get()
  public async findAll(@ReqUser() authUser: User, @Param('username', ResolveUserPipe) user: User) {
    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.READ, user) || ability.cannot(Action.READ, Emotion)) {
      throw new UnauthorizedException();
    }
    return await this.emotionService.findByUser(user);
  }

  @Post()
  public async create(@ReqUser() authUser: User, @Param('username', ResolveUserPipe) user: User, @Body() body: CreateEmotionDTO) {
    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.UPDATE, user) || ability.cannot(Action.CREATE, Emotion)) {
      throw new UnauthorizedException();
    }
    return await this.emotionService.create(authUser, body);
  }
}
