import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ReportController } from './report.controller';
import { ReportService } from './report.service';

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
  controllers: [ReportController],
  providers: [ReportService]
})
export class ReportModule {}
