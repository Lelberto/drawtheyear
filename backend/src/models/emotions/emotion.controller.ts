import { Body, ClassSerializerInterceptor, Controller, Delete, Get, NotFoundException, Param, Patch, Post, UnauthorizedException, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AbilityFactory } from '../../casl/ability.factory';
import { Action } from '../../casl/action.enum';
import { ReqUser } from '../../common/decorators/request-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';
import { User } from '../users/entities/user.entity';
import { CreateEmotionDTO, DeleteEmotionParams, UpdateEmotionDTO, UpdateEmotionParams } from './dto/emotion.dto';
import { EmotionService } from './emotion.service';

@Controller('emotions')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmotionController {

  private readonly emotionService: EmotionService;
  private readonly abilityFactory: AbilityFactory;

  public constructor(emotionService: EmotionService, abilityFactory: AbilityFactory) {
    this.emotionService = emotionService;
    this.abilityFactory = abilityFactory;
  }

  @Get()
  public async findAll(@ReqUser() user: User) {
    return await this.emotionService.findByUser(user);
  }

  @Post()
  public async create(@ReqUser() user: User, @Body() dto: CreateEmotionDTO) {
    return await this.emotionService.create(user, dto);
  }

  @Patch(':emotionId')
  public async update(@ReqUser() user: User,  @Param() params: UpdateEmotionParams, @Body() dto: UpdateEmotionDTO) {
    const ability = this.abilityFactory.createForUser(user);
    const emotion = await this.emotionService.findById(params.emotionId);
    if (!emotion) {
      throw new NotFoundException(`Emotion with ID ${params.emotionId} not found`);
    }
    if (ability.cannot(Action.UPDATE, emotion)) {
      throw new UnauthorizedException('You can only update your own emotions');
    }
    return await this.emotionService.update(emotion, dto);
  }

  @Delete(':emotionId')
  public async delete(@ReqUser() user: User, @Param() params: DeleteEmotionParams) {
    const ability = this.abilityFactory.createForUser(user);
    const emotion = await this.emotionService.findById(params.emotionId);
    if (!emotion) {
      throw new NotFoundException(`Emotion with ID ${params.emotionId} not found`);
    }
    if (ability.cannot(Action.DELETE, emotion)) {
      throw new UnauthorizedException('You can only delete your own emotions');
    }
    await this.emotionService.delete(emotion);
  }
}
