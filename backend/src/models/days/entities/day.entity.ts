import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Day {

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
}
