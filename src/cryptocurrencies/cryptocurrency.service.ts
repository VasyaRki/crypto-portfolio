import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cryptocurrency } from './cryptocurrency.entity';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';
import { EntityService } from '../entities/entity.service';

export class CryptocurrencyService extends EntityService<Cryptocurrency> {
  constructor(
    @InjectRepository(Cryptocurrency)
    private service: Repository<Cryptocurrency>
  ) {
    super(service);
  }
}
