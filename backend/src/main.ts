import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';
import { ConfigService, ConfigType } from '@nestjs/config';
import logConfig from './config/log.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  const config = app.get(ConfigService);

  app.useLogger(createLogger(config.get<ConfigType<typeof logConfig>>('log').path));

  const swaggerConfig = new DocumentBuilder()
    .setTitle('DrawTheYear API')
    .setVersion('1.0')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, swaggerDoc);

  app.enableCors(); // TODO Configure CORS
  
  await app.listen(80);
}

function createLogger(logPath: string) {
  const transports: winston.transport[] = [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike('App', { colors: true, prettyPrint: true })
      )
    }),
    new winston.transports.File({
      dirname: logPath,
      filename: 'app.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        utilities.format.nestLike('App', { colors: false, prettyPrint: false })
      )
    })
  ];
  return WinstonModule.createLogger({ transports });
}

bootstrap();
