import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TreasuryModule } from './treasury/treasury.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './users/user.module';

import { Treasury } from './shared/models/treasury.entity';
import { Expense } from './shared/models/expense.entity';
import { Recipe } from './shared/models/recipe.entity';
import { User } from './shared/models/user.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { ReportModule } from './report/report.module';
import { HistoricModule } from './historic/historic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'treasurydb',
      entities: [
        Treasury, 
        Expense,
        Recipe,
        User
      ],
      synchronize: true
    }),
    TreasuryModule,
    AuthModule,
    UserModule,
    TransactionsModule,
    ReportModule,
    HistoricModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}