import {
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { ArgUser, UseToken } from '../decorators/auth.decorators';
import { Portfolio } from './portfolio.entity';

@Controller('portfolio')
export class PortfolioController {
  constructor(private service: PortfolioService) {}

  @UseToken()
  @Post()
  createPortfolio(@ArgUser() user: any): Promise<Portfolio> {
    return this.service.create({ user: user.id, value: 0, assets: 0 });
  }

  @UseToken()
  @Get()
  getPortfolio(@ArgUser() user: any): Promise<Portfolio> {
    return this.service.getOne({ user: user.id}, ['portfolioAssets'])
  }

  @Get(':id')
  getPortfolioByUserId(@Param() id: any) : Promise<Portfolio> {
    return this.service.getOne({ user: id}, ['portfolioAssets'])
  }
}
