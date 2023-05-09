import { ArgumentMetadata, Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { EmotionService } from '../../models/emotions/emotion.service';
import { Emotion } from '../../models/emotions/entities/emotion.entity';

@Injectable()
export class ResolveEmotionPipe implements PipeTransform<number, Promise<Emotion>> {

  private readonly emotionService: EmotionService;

  public constructor(emotionService: EmotionService) {
    this.emotionService = emotionService;
  }

  public async transform(value: number, metadata: ArgumentMetadata): Promise<Emotion> {
    const emotion = await this.emotionService.findById(value);
    if (!emotion) {
      throw new NotFoundException(`Emotion with ID "${value}" not found`);
    }
    return emotion;
  }
}
