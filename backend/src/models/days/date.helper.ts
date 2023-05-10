import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { DateTime } from 'luxon';
import dayConfig from '../../config/day.config';

@Injectable()
export class DateHelper {

  private readonly config: ConfigType<typeof dayConfig>;

  public constructor(@Inject(dayConfig.KEY) config: ConfigType<typeof dayConfig>) {
    this.config = config;
  }

  public isValid(date: Date): boolean {
    const luxonDate = DateTime.fromISO(date.toString());
    const luxonStartDate = DateTime.fromISO(this.config.startDate);
    const luxonEndDate = DateTime.now();
    return luxonDate >= luxonStartDate && luxonDate <= luxonEndDate;
  }
}
