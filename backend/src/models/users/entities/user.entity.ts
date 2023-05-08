import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../../common/constants/role.enum';

@Entity({
  name: 'users'
})
export class User {

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
}
