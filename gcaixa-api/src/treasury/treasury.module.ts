import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TreasuryController } from './treasury.controller';
import { TreasuryService } from './treasury.service';
import { TransactionsService } from './transactions.service';

import { Treasury } from 'src/shared/models/treasury.entity';
import { Expense } from 'src/shared/models/expense.entity';
import { Recipe } from 'src/shared/models/recipe.entity';
import { Credit } from 'src/shared/models/credit.entity';
import { Inventory } from 'src/shared/models/inventory.entity';


@Module({
  imports: [TypeOrmModule.forFeature([
    Treasury, 
    Expense,
    Recipe,
    Credit,
    Inventory
  ])],
  controllers: [ TreasuryController ],
  providers: [ TreasuryService, TransactionsService ]
})
export class TreasuryModule {}
