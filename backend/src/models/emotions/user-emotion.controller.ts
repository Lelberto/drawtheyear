import { ClassSerializerInterceptor, Controller, Get, Param, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { ResponseFormatterInterceptor } from '../../common/interceptors/response-formatter.interceptor';
import { ResolveUserPipe } from '../../common/pipes/resolve-user.pipe';
import { User } from '../users/entities/user.entity';
import { EmotionService } from './emotion.service';

@Controller('users/:username/emotions')
@UseInterceptors(ClassSerializerInterceptor, ResponseFormatterInterceptor)
@UsePipes(ValidationPipe)
export class UserEmotionController {

  private readonly emotionService: EmotionService;

  public constructor(emotionService: EmotionService) {
    this.emotionService = emotionService;
  }

  @Get()
  public async findAll(@Param('username', ResolveUserPipe) user: User) {
    return await this.emotionService.findByUser(user);
  }
}
