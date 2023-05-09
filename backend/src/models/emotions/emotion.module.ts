import { Module } from '@nestjs/common';
import { EmotionService } from './emotion.service';
import { EmotionRepository } from './repositories/emotion.repository';
import { EmotionController } from './emotion.controller';
import { CASLModule } from '../../casl/casl.module';
import { UserEmotionController } from './user-emotion.controller';
import { UserModule } from '../users/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Emotion } from './entities/emotion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Emotion]), UserModule, CASLModule],
  providers: [EmotionService, EmotionRepository],
  controllers: [EmotionController, UserEmotionController],
  exports: [EmotionService]
})
export class EmotionModule {}
