import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class IncomeService {

    public emitterIncome = new EventEmitter<any>();

    public constructor() {
        this.emitterIncome.emit();
    }

    public loader(initialAmount: number, currentBalance: number, incomeRecipes: number, incomeExpenses: number) {
        this.emitterIncome.emit({ initialAmount, currentBalance, incomeRecipes, incomeExpenses });
    }
}