import { Exclude } from 'class-transformer';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Emotion } from '../../emotions/entities/emotion.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'day' })
export class Day {

  static get modelName() {
    return 'Day';
  }

  @PrimaryGeneratedColumn()
  @Exclude({ toPlainOnly: true })
  id: number;

  @Column()
  userId: number;

  @Column({
    type: 'date'
  })
  date: Date;

  @Column({
    type: 'text',
    nullable: true
  })
  resume: string;

  @ManyToOne(() => User, user => user.days)
  user: User;

  @ManyToMany(() => Emotion, emotion => emotion.days, {
    eager: true
  })
  @JoinTable({ name: 'day_emotion' })
  emotions: Emotion[];
}
