import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from '../users/user.entity';
@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  authorId: number;

  @Column()
  value: number;

  @Column()
  assets: number;

  @OneToOne(() => User)
  @JoinColumn()
  author: User;
}
