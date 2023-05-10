import { IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDayDTO {

  @IsDateString()
  date: Date;

  @IsString()
  @IsOptional()
  resume: string;
}

export class AddEmotionDTO {

  @IsNumber()
  emotionId: number;
}

export class RemoveEmotionDTO extends AddEmotionDTO {}

export class DayParams {

  @IsDateString()
  date: Date;
}
