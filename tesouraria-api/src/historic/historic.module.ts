import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HistoricController } from './historic.controller';
import { HistoricService } from './historic.service';

import { Treasury } from 'src/shared/models/treasury.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      Treasury
  ])
  ],
  controllers: [HistoricController],
  providers: [HistoricService]
})
export class HistoricModule {}
