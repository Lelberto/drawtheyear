import { Exclude } from 'class-transformer';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users'
})
export class User {

  @PrimaryGeneratedColumn()
  id: number;

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

  @BeforeInsert()
  formatUsername() {
    this.username = this.username.replace(/[^a-zA-Z0-9]/g, '').substring(0, 16).toLowerCase(); // TODO If generated username already exists, the current user will not be able to create himself
  }
}
