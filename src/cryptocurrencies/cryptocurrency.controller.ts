import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { CryptocurrencyService } from './cryptocurrency.service';
import { Cryptocurrency } from './cryptocurrency.entity';
import { CreateCryptocurrencyDto } from './dto/create-cryptocurrency.dto';

@Controller('cryptocurrency')
export class CryptocurrencyController {
  constructor(private readonly cryptocurrencyService: CryptocurrencyService) {}

  @Get()
  public async getCryptocurrencies(): Promise<Cryptocurrency[]> {
    return await this.cryptocurrencyService.getMany();
  }

  @Get(':symbol')
  public getCryptocurrencyBySymbol(
    @Param('symbol') symbol: string
  ): Promise<object> {
    console.log(symbol);
    return this.cryptocurrencyService.getMetadata(symbol);
  }

  @Post()
  public async createCryptocurrency(
    @Body() cryptocurrencyDto: CreateCryptocurrencyDto
  ): Promise<Cryptocurrency> {
    return await this.cryptocurrencyService.create(cryptocurrencyDto);
  }
}
