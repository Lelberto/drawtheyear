import { Exclude, Transform } from 'class-transformer';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from '../../days/entities/day.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'emotion' })
export class Emotion {

  static get modelName() {
    return 'Emotion';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

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

  @ManyToOne(() => User, user => user.emotions)
  @Exclude({ toPlainOnly: true })
  user: User;

  @ManyToMany(() => Day, day => day.emotions)
  days: Day[];
}
