import { Module } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import databaseConfig from '../config/database.config';
import { User } from '../models/users/entities/user.entity';

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
        entities: [User],
        synchronize: true,
        namingStrategy: new SnakeNamingStrategy(),
        logging: true
      }),
      inject: [ConfigService]
    }),
  ]
})
export class DatabaseModule {}
