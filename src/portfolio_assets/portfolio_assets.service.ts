import { InjectRepository } from '@nestjs/typeorm';
import { EntityService } from '../common/entity.service';
import { Repository } from 'typeorm';
import { PortfolioAssets } from './portfolio_assets.entity';

export class PortfolioAssetsService extends EntityService<PortfolioAssets> {
  constructor(
    @InjectRepository(PortfolioAssets)
    private service: Repository<PortfolioAssets>
  ) {
    super(service);
  }
}
