import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Transform } from 'class-transformer';

@Entity({ name: 'emotions' })
export class Emotion {

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.emotions)
  user: User;

  @Column({
    type: 'varchar',
    length: 20
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 7
  })
  @Transform(params => {
    let value: string = params.value;
    if (value[0] !== '#') {
      value = `#${value}`;
    }
    return value;
  })
  color: string;
}
