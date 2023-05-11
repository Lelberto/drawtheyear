import { Logger, Module, OnModuleInit } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config/configuration.module';
import { DatabaseModule } from './database/database.module';
import { EmotionModule } from './models/emotions/emotion.module';
import { UserModule } from './models/users/user.module';
import { DayModule } from './models/days/day.module';
import { Context } from './common/constants/logger.constants';
import { ApplicationModule } from './models/applications/application.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
    AuthModule,
    ApplicationModule,
    UserModule,
    EmotionModule,
    DayModule
  ]
})
export class AppModule implements OnModuleInit {

  private readonly logger = new Logger(Context.APPLICATION);

  public onModuleInit() {
    this.logger.log(`Environment : ${process.env.NODE_ENV}`);
  }
}
