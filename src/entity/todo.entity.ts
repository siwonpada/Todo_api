import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'Todos' })
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  content: string;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User, (user) => user.todos)
  user: User;
}
