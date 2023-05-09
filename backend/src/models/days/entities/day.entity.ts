import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Day {

  @PrimaryGeneratedColumn()
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
