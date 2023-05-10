import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Day } from './entities/day.entity';
import { DayRepository } from './repositories/day.repository';
import { Emotion } from '../emotions/entities/emotion.entity';

@Injectable()
export class DayService {

  private readonly dayRepo: DayRepository;

  public constructor(dayRepo: DayRepository) {
    this.dayRepo = dayRepo;
  }

  public async findAll(user: User): Promise<Day[]> {
    return await this.dayRepo.findBy({ userId: user.id });
  }

  public async findByDate(user: User, date: Date): Promise<Day> {
    return await this.dayRepo.findOneBy({ userId: user.id, date });
  }

  public async create(user: User, data: Partial<Day>): Promise<Day> {
    const day = this.dayRepo.create({ ...data, user });
    return await this.dayRepo.save(day);
  }

  public async addEmotion(day: Day, emotion: Emotion): Promise<void> {
    day.emotions.push(emotion);
    await this.dayRepo.save(day);
  }

  public async removeEmotion(day: Day, emotion: Emotion): Promise<void> {
    day.emotions = day.emotions.filter(currentEmotion => currentEmotion.id !== emotion.id);
    await this.dayRepo.save(day);
  }

  public async exists(user: User, date: Date): Promise<boolean> {
    return await this.dayRepo.exist({ where: { userId: user.id, date } });
  }
}
