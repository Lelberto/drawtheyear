import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import databaseConfig from './database.config';
import authConfig from './auth.config';
import logConfig from './log.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.development', '.env'],
      load: [logConfig, databaseConfig, authConfig]
    })
  ]
})
export class ConfigurationModule {}
