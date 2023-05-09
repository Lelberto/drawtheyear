import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsHexColor, IsNumberString, Length } from 'class-validator';

export class CreateEmotionDTO {
  
  @ApiProperty()
  @Length(1, 20)
  name: string;

  @ApiProperty()
  @IsHexColor()
  color: string;
}

export class UpdateEmotionDTO extends PartialType(CreateEmotionDTO) {}

export class EmotionParams {

  @IsNumberString()
  emotionId: number;
}
