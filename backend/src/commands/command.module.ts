import { Module } from '@nestjs/common';
import { CreateApplicationCommand, CreateApplicationQuestions } from './application/create-application.command';
import { ConfigurationModule } from '../config/configuration.module';
import { DatabaseModule } from '../database/database.module';
import { ApplicationModule } from '../models/applications/application.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    ApplicationModule
  ],
  providers: [
    CreateApplicationCommand,
    CreateApplicationQuestions
  ]
})
export class CommandModule {}
