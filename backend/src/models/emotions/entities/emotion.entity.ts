import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Exclude, Transform } from 'class-transformer';

@Entity({ name: 'emotions' })
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
}
