import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TreasuryController } from './treasury.controller';
import { TreasuryService } from './treasury.service';
import { Treasury } from 'src/shared/models/treasury.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Treasury
    ])
  ],
  controllers: [TreasuryController],
  providers: [TreasuryService]
})
export class TreasuryModule {}
