import { Portfolio } from 'src/portfolio/portfolio.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({unique: true})
  username: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  @OneToOne(() => Portfolio, (portfolio) => portfolio.user)
  portfolio: Portfolio
}