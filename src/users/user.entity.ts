import { Portfolio } from 'src/portfolio/portfolio.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
  @ApiProperty({ example: '1' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'user1' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({ example: 'user@gmail.com' })
  @Column({ unique: true })
  email: string;

  @ApiProperty({ example: 'root' })
  @Column()
  password: string;

  @OneToOne(() => Portfolio, portfolio => portfolio.user)
  portfolio: Portfolio;
}
