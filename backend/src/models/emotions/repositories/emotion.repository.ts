import { DataSource, Repository } from 'typeorm';
import { Emotion } from '../entities/emotion.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmotionRepository extends Repository<Emotion> {
  
  public constructor(dataSource: DataSource) {
    super(Emotion, dataSource.createEntityManager());
  }
}
