 import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn
 } from 'typeorm'
import { Portfolio } from '../portfolio/portfolio.entity';


@Entity()
export class PortfolioAssets {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  asset_name: string;

  @Column()
  asset_quantity: number

  @ManyToOne(() => Portfolio, portfolio => portfolio.portfolioAssets)
  portfolio: Portfolio

}