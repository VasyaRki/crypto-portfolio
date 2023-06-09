import { Module, forwardRef } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { PortfolioService } from './portfolio.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from './portfolio.entity';
import { AuthModule } from '../auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([Portfolio]),
    forwardRef(() => AuthModule),
  ],
  providers: [
    PortfolioService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [PortfolioController],
})
export class PortfolioModule {}
