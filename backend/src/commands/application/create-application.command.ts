import { Command, CommandRunner, InquirerService, Question, QuestionSet } from 'nest-commander';
import { ApplicationService } from '../../models/applications/application.service';
import { Logger } from '@nestjs/common';
import { Application } from '../../models/applications/entities/application.entity';

@Command({
  name: 'application:create',
  arguments: '[name] [loginCallbackUrl',
  options: { isDefault: true }
})
export class CreateApplicationCommand extends CommandRunner {

  private readonly logger = new Logger(CreateApplicationCommand.name);
  private readonly inquirer: InquirerService;
  private readonly applicationService: ApplicationService;

  public constructor(inquirer: InquirerService, applicationService: ApplicationService) {
    super();
    this.inquirer = inquirer;
    this.applicationService = applicationService;
  }

  public async run(params: string[], options?: Record<string, any>): Promise<void> {
    const data = await this.inquirer.ask<Partial<Application>>(
      'createApplicationQuestions',
      { name: params[0], loginCallbackUrl: params[1] }
    );
    const application = await this.applicationService.create(data);
    this.logger.log(`Application created : ${JSON.stringify(application)}`);
  }
}



@QuestionSet({ name: 'createApplicationQuestions' })
export class CreateApplicationQuestions {

  @Question({
    type: 'input',
    name: 'name',
    message: 'Application name'
  })
  parseName(value: string) {
    return value;
  }

  @Question({
    type: 'input',
    name: 'loginCallbackUrl',
    message: 'Login callback URL'
  })
  parseLoginCallbackUrl(value: string) {
    return value;
  }
}
