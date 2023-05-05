import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config/configuration.module';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './models/users/user.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    AuthModule,
    UserModule
  ]
})
export class AppModule {}
