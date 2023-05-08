import { Exclude } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Emotion } from '../../emotions/entities/emotion.entity';
import { Role } from '../../../common/constants/role.enum';

@Entity({
  name: 'users'
})
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Emotion, emotion => emotion.user)
  emotions: Emotion[];

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
}
