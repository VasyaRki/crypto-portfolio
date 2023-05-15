import { IsNotEmpty } from 'class-validator';

export class CreateCryptocurrencyDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  symbol: string;
}
