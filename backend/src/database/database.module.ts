import { Module } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { FileLogger } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import databaseConfig from '../config/database.config';
import logConfig from '../config/log.config';
import { User } from '../models/users/entities/user.entity';
import { Emotion } from '../models/emotions/entities/emotion.entity';
import { Day } from '../models/days/entities/day.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: 'dty_database',
        port: 5432,
        username: config.get<ConfigType<typeof databaseConfig>>('database').user,
        password: config.get<ConfigType<typeof databaseConfig>>('database').password,
        database: config.get<ConfigType<typeof databaseConfig>>('database').db,
        entities: [User, Emotion, Day],
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        logging: true,
        logger: new FileLogger('all', { logPath: join(config.get<ConfigType<typeof logConfig>>('log').path, 'database.log') })
      }),
      inject: [ConfigService]
    }),
  ]
})
export class DatabaseModule {}
