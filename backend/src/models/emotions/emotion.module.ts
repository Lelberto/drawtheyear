import { Module } from '@nestjs/common';
import { EmotionController } from './emotion.controller';
import { EmotionService } from './emotion.service';
import { EmotionRepository } from './repositories/emotion.repository';

@Module({
  providers: [EmotionService, EmotionRepository],
  controllers: [EmotionController],
  exports: [EmotionService]
})
export class EmotionModule {}
