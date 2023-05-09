import { Module } from '@nestjs/common';
import { EmotionService } from './emotion.service';
import { EmotionRepository } from './repositories/emotion.repository';
import { EmotionController } from './emotion.controller';
import { CASLModule } from '../../casl/casl.module';

@Module({
  imports: [CASLModule],
  providers: [EmotionService, EmotionRepository],
  controllers: [EmotionController],
  exports: [EmotionService]
})
export class EmotionModule {}
