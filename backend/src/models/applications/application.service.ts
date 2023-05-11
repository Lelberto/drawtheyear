import { Injectable } from '@nestjs/common';
import { ApplicationRepository } from './repositories/application.repository';
import { Application } from './entities/application.entity';

@Injectable()
export class ApplicationService {

  private readonly applicationRepo: ApplicationRepository;

  public constructor(applicationRepo: ApplicationRepository) {
    this.applicationRepo = applicationRepo;
  }

  public async findAll(): Promise<Application[]> {
    return await this.applicationRepo.find();
  }

  public async findById(id: number): Promise<Application> {
    return await this.applicationRepo.findOneBy({ id });
  }

  public async create(data: Partial<Application>): Promise<Application> {
    const app = this.applicationRepo.create(data);
    return await this.applicationRepo.save(app);
  }
}
