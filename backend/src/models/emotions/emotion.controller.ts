import { Body, ClassSerializerInterceptor, Controller, Get, Param, Patch, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReqUser } from '../../common/decorators/request-user.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';
import { User } from '../users/entities/user.entity';
import { CreateEmotionDTO, UpdateEmotionDTO, UpdateEmotionParams } from './dto/emotion.dto';
import { EmotionService } from './emotion.service';

@Controller('emotions')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UsePipes(ValidationPipe)
@UseGuards(JwtAuthGuard, RolesGuard)
export class EmotionController {

  private readonly emotionService: EmotionService;

  public constructor(emotionService: EmotionService) {
    this.emotionService = emotionService;
  }

  @Get()
  public async findAll() {
    return await this.emotionService.findAll();
  }

  @Post()
  public async create(@ReqUser() user: User, @Body() dto: CreateEmotionDTO) {
    return await this.emotionService.create(user, dto);
  }

  @Patch(':emotionId')
  public async update(@ReqUser() user: User,  @Param() params: UpdateEmotionParams, @Body() dto: UpdateEmotionDTO) {
    await this.emotionService.update(user, params.emotionId, dto);
  }
}
