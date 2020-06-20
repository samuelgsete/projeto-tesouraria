import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InventoryService } from './inventory.service';
import { Inventory } from 'src/shared/models/inventory.entity';
import { Treasury } from 'src/shared/models/treasury.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Treasury,
      Inventory
    ])
],
  controllers: [InventoryController],
  providers: [InventoryService]
})
export class InventoryModule {}
