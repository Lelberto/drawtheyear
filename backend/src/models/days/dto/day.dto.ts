import { IsDateString, IsOptional, IsString } from 'class-validator';

export class CreateDayDTO {

  @IsDateString()
  date: Date;

  @IsString()
  @IsOptional()
  resume: string;
}

export class DayParams {

  @IsDateString()
  date: Date
}
