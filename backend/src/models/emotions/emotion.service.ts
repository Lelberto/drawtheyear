import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Emotion } from './entities/emotion.entity';
import { EmotionRepository } from './repositories/emotion.repository';

@Injectable()
export class EmotionService {

  private readonly emotionRepo: EmotionRepository;

  public constructor(emotionRepo: EmotionRepository) {
    this.emotionRepo = emotionRepo;
  }

  public async findAll(): Promise<Emotion[]> {
    return await this.emotionRepo.find();
  }

  public async create(user: User, data: Partial<Emotion>): Promise<Emotion> {
    const emotion = this.emotionRepo.create({ ...data, user });
    return await this.emotionRepo.save(emotion);
  }

  public async update(user: User, emotionId: number, data: Partial<Emotion>): Promise<void> {
    await this.emotionRepo.update({ id: emotionId }, data); // TODO Role checking
  }
}
