import { CommandFactory } from 'nest-commander';
import { CommandModule } from './commands/command.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  await CommandFactory.run(CommandModule, new Logger());
}

bootstrap();
