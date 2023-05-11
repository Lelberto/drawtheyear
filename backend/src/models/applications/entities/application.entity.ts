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
}
