import { Component, OnInit } from '@angular/core';

import { Income } from 'src/app/shared/models/income.entity';
import { IncomeService } from './income.service';

@Component({
  selector: 'app-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class IncomeComponent implements OnInit {

  public income = new Income();

  public constructor(private readonly incomeService: IncomeService) { 
    this.incomeService.emitterIncome.subscribe( income => {
      this.income.initialAmount = income.initialAmount;
      this.income.currentBalance = income.currentBalance;
      this.income.incomeRecipes = income.incomeRecipes;
      this.income.incomeExpenses = income.incomeExpenses;
    });
  }

  ngOnInit(): void {}
}