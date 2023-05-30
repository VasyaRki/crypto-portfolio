import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PortfolioAssetsService } from './portfolio_assets.service';
import { PortfolioAssets } from './portfolio_assets.entity';
import { ArgUser, UseToken } from '../decorators/auth.decorators';

@Controller('portfolio-assets')
export class PortfolioAssetsController {
  constructor(private service: PortfolioAssetsService) {}

  @UseToken()
  @Post()
  create(@ArgUser() user : any, @Body() payload : any) : Promise<PortfolioAssets> {
    return this.service.create({...payload, portfolio: user.id});
  }
}
