import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Emotion } from '../../emotions/entities/emotion.entity';
import { Role } from '../../../common/constants/role.enum';
import { Day } from '../../days/entities/day.entity';

@Entity({ name: 'user' })
export class User {

  static get modelName() {
    return 'User';
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.USER
  })
  role: Role;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true
  })
  email: string;

  @Column({
    type: 'text',
    nullable: true
  })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({
    type: 'varchar',
    length: 16,
    unique: true
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 32
  })
  displayName: string;

  @OneToMany(() => Emotion, emotion => emotion.user)
  emotions: Emotion[];

  @OneToMany(() => Day, day => day.user)
  days: Day[];
}
