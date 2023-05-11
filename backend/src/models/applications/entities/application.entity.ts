import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('application')
export class Application {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 30
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 100
  })
  loginCallbackUrl: string;
}
