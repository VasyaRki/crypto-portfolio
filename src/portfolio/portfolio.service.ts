import { EntityService } from '../entities/entity.service';
import { Portfolio } from './portfolio.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class PortfolioService extends EntityService<Portfolio> {
  constructor(
    @InjectRepository(Portfolio)
    private service: Repository<Portfolio>
  ) {
    super(service);
  }
}
