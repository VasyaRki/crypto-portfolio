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
  getSymbol(@Param() params: any): Promise<Cryptocurrency> {
    const { symbol } = params;
    return this.cryptocurrencyService.getOne({symbol});
  }

  @Post()
  createCryptocurrency(@Body() cryptocurrencyDto: CreateCryptocurrencyDto): Promise<Cryptocurrency> {
    return this.cryptocurrencyService.create(cryptocurrencyDto);
  }
}
