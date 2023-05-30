import { Module, forwardRef } from '@nestjs/common';
import { PortfolioAssetsService } from './portfolio_assets.service';
import { PortfolioAssetsController } from './portfolio_assets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioAssets } from './portfolio_assets.entity';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([PortfolioAssets]),
    forwardRef(() => AuthModule),
  ],
  providers: [
    PortfolioAssetsService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [PortfolioAssetsController],
})
export class PortfolioAssetsModule {}
