import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users'
})
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 100
  })
  email: string;

  @Column({
    type: 'text',
    nullable: true
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 16
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 32
  })
  displayName: string;
}
