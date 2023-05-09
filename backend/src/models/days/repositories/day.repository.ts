import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Day } from '../entities/day.entity';

@Injectable()
export class DayRepository extends Repository<Day> {

  public constructor(dataSource: DataSource) {
    super(Day, dataSource.createEntityManager());
  }
}
