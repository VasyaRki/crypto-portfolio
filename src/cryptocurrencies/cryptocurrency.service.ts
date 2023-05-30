import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cryptocurrency } from './cryptocurrency.entity';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';
import { EntityService } from '../entities/entity.service';

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
          'X-CMC_PRO_API_KEY': 'ec7fcc01-494b-4eb7-b0a3-8dc2791cb79c',
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
