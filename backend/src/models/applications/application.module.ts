import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './entities/application.entity';
import { ApplicationService } from './application.service';
import { ApplicationRepository } from './repositories/application.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  providers: [ApplicationService, ApplicationRepository],
  exports: [ApplicationService]
})
export class ApplicationModule {}
