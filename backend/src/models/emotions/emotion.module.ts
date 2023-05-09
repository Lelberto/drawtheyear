import { Module } from '@nestjs/common';
import { EmotionService } from './emotion.service';
import { EmotionRepository } from './repositories/emotion.repository';
import { EmotionController } from './emotion.controller';
import { CASLModule } from '../../casl/casl.module';
import { UserEmotionController } from './user-emotion.controller';
import { UserModule } from '../users/user.module';

@Module({
  imports: [UserModule, CASLModule],
  providers: [EmotionService, EmotionRepository],
  controllers: [EmotionController, UserEmotionController],
  exports: [EmotionService]
})
export class EmotionModule {}
