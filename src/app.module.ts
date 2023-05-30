import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Cryptocurrency } from './cryptocurrencies/cryptocurrency.entity';
import { UsersModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { CryptocurrencyModule } from './cryptocurrencies/cryptocurrency.module';
import { PortfolioService } from './portfolio/portfolio.service';
import { PortfolioModule } from './portfolio/portfolio.module';
import { Portfolio } from './portfolio/portfolio.entity';
import { AuthModule } from './auth/auth.module';
import { PortfolioAssetsModule } from './portfolio_assets/portfolio_assets.module';
import { PortfolioAssets } from './portfolio_assets/portfolio_assets.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      entities: [User, Cryptocurrency, Portfolio, PortfolioAssets],
      synchronize: true,
    }),
    UsersModule,
    CryptocurrencyModule,
    PortfolioModule,
    AuthModule,
    PortfolioAssetsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
