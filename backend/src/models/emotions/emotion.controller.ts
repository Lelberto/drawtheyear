import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AbilityFactory } from '../../casl/ability.factory';
import { Action } from '../../casl/action.enum';
import { ReqUser } from '../../common/decorators/request-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';
import { ResolveEmotionPipe } from '../../common/pipes/resolve-emotion.pipe';
import { User } from '../users/entities/user.entity';
import { CreateEmotionDTO, UpdateEmotionDTO } from './dto/emotion.dto';
import { EmotionService } from './emotion.service';
import { Emotion } from './entities/emotion.entity';

@Controller('emotions')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UseGuards(JwtAuthGuard)
@UsePipes(ValidationPipe)
export class EmotionController {

  private readonly emotionService: EmotionService;
  private readonly abilityFactory: AbilityFactory;

  public constructor(emotionService: EmotionService, abilityFactory: AbilityFactory) {
    this.emotionService = emotionService;
    this.abilityFactory = abilityFactory;
  }

  @Get()
  public async findAll(@ReqUser() authUser: User) {
    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.READ, Emotion)) {
      throw new UnauthorizedException();
    }

    return await this.emotionService.findByUser(authUser);
  }

  @Get(':emotionId')
  public async findById(@ReqUser() authUser: User, @Param('emotionId', ParseIntPipe, ResolveEmotionPipe) emotion: Emotion) {
    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.READ, emotion)) {
      throw new UnauthorizedException();
    }

    return emotion;
  }

  @Post()
  public async create(@ReqUser() authUser: User, @Body() body: CreateEmotionDTO) {
    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.CREATE, Emotion)) {
      throw new UnauthorizedException();
    }

    return await this.emotionService.create(authUser, body);
  }

  @Patch(':emotionId')
  public async update(@ReqUser() authUser: User,  @Param('emotionId', ParseIntPipe, ResolveEmotionPipe) emotion: Emotion, @Body() body: UpdateEmotionDTO) {
    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.UPDATE, emotion)) {
      throw new UnauthorizedException('You can only update your own emotions');
    }

    return await this.emotionService.update(emotion, body);
  }

  @Delete(':emotionId')
  public async delete(@ReqUser() authUser: User, @Param('emotionId', ParseIntPipe, ResolveEmotionPipe) emotion: Emotion) {
    const ability = this.abilityFactory.createForUser(authUser);
    if (ability.cannot(Action.DELETE, emotion)) {
      throw new UnauthorizedException('You can only delete your own emotions');
    }

    await this.emotionService.delete(emotion);
  }
}
