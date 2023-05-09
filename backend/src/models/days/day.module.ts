import { Module } from '@nestjs/common';
import { DayService } from './day.service';
import { DayRepository } from './repositories/day.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Day } from './entities/day.entity';
import { UserDayController } from './user-day.controller';
import { DayController } from './day.controller';
import { UserModule } from '../users/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Day]), UserModule],
  providers: [DayService, DayRepository],
  controllers: [DayController, UserDayController],
  exports: [DayService]
})
export class DayModule {}
