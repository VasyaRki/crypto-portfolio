import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cryptocurrency } from './cryptocurrency.entity';
import { EntityService } from '../common/entity.service';

import axios from 'axios';

export class CryptocurrencyService extends EntityService<Cryptocurrency> {
  constructor(
    @InjectRepository(Cryptocurrency)
    private service: Repository<Cryptocurrency>
  ) {
    super(service);
  }

  async getMetadata(symbol: string) : Promise<any>{
    const response = axios.get(
      'https://pro-api.coinmarketcap.com/v2/cryptocurrency/info',
      {
        headers: {
          'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP,
        },
        params: {
          symbol: symbol,
        },
      }
    );
    const metadata = response.then(res => res.data);
    const coinInfo = metadata.then(metadata => metadata.data);
    return coinInfo;
  }
}
