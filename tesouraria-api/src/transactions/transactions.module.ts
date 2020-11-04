import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

import { Treasury } from 'src/shared/models/treasury.entity';
import { Expense } from 'src/shared/models/expense.entity';
import { Recipe } from 'src/shared/models/recipe.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            Treasury, 
            Expense,
            Recipe
        ])
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService]
})
export class TransactionsModule {}
