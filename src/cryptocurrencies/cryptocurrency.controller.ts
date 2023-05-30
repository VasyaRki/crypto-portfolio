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
import { CryptocurrencyService } from './cryptocurrency.service';
import { Cryptocurrency } from './cryptocurrency.entity';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';

@Controller('cryptocurrency')
export class CryptocurrencyController {
  constructor(private cryptocurrencyService: CryptocurrencyService) {}
  @Get()
  getCryptocurrencies(): Promise<Cryptocurrency[]> {
    return this.cryptocurrencyService.getMany();
  }

  @Get(':symbol')
  getCryptocurrencyBySymbol(@Param('symbol') symbol: string) : object {
    console.log(symbol);
    const data = this.cryptocurrencyService.getMetadata(symbol);
    return data;
  }

  @Post()
  createCryptocurrency(
    @Body() cryptocurrencyDto: CreateCryptocurrencyDto
  ): Promise<Cryptocurrency> {
    return this.cryptocurrencyService.create(cryptocurrencyDto);
  }
} 
