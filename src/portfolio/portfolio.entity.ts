import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../users/user.entity';
import { PortfolioAssets } from '../portfolio_assets/portfolio_assets.entity';
@Entity()
export class Portfolio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @Column()
  assets: number;

  @OneToOne(() => User, (user) => user.portfolio)
  @JoinColumn()
  user: User;

  @OneToMany(() => PortfolioAssets, portfolioAssets => portfolioAssets.portfolio)
  portfolioAssets: PortfolioAssets[]
}
