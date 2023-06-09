import { Module } from '@nestjs/common';
import { DayService } from './day.service';
import { DayRepository } from './repositories/day.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from './entities/day.entity';
import { UserDayController } from './user-day.controller';
import { DayController } from './day.controller';
import { UserModule } from '../users/user.module';
import { CASLModule } from '../../casl/casl.module';
import { DateHelper } from './date.helper';
import { EmotionModule } from '../emotions/emotion.module';

@Module({
  imports: [TypeOrmModule.forFeature([Day]), UserModule, EmotionModule, CASLModule],
  providers: [DayService, DayRepository, DateHelper],
  controllers: [DayController, UserDayController],
  exports: [DayService]
})
export class DayModule {}
