import { Injectable } from "@nestjs/common";

import { Entrada } from "src/shared/models/entrada.entity";
import { Saida } from "src/shared/models/saida.entity";

@Injectable()
export class TransactionsService {
    
    public constructor() {}

    public updateBalance(recipes: Entrada[], expenses: Saida[], openingBalance: number): number {
        let balance = 0;

        recipes.forEach( recipe => {
            recipe = this.updateRecipe(recipe);
            balance += recipe.valor;
        });

        expenses.forEach( expense => {
            balance -= expense.valor;
        });

        return balance + openingBalance;
    }

    private updateRecipe(recipe: Entrada): Entrada {
        let value = 0;
        recipe.creditos.forEach( credit => {
            if(credit.situacao === 'QUITADO'){
                value += credit.valor;
                credit.situacao = 'ENCERRADO';
            }
        });
        recipe.valor += value;
        return recipe;
    }

    public getTransactionsByMonth(year: number, month: number, recipes: Entrada[], expenses: Saida[]): any {
        recipes = recipes.filter( recipe => {
            return recipe.registradoEm.getFullYear() == year && recipe.registradoEm.getMonth() == month;
        });

        expenses = expenses.filter( expense => {
            return expense.registradoEm.getFullYear() == year && expense.registradoEm.getMonth() == month;
        });

        return { recipes, expenses }
    }

    private getIncome(recipes: Entrada[], expenses: Saida[]): any {

        let incomeRecipes = 0

        recipes.forEach( recipe => {
            incomeRecipes += recipe.valor;
        });

        let incomeExpenses = 0;

        expenses.forEach( expense => {
            incomeExpenses += expense.valor;
        });

        return { incomeRecipes, incomeExpenses }
    }

    public getRecipeGeneral(recipes: Entrada[], expenses: Saida[], openingBalance: number, currentBalance: number): any {
 
        let { incomeRecipes, incomeExpenses } = this.getIncome(recipes, expenses);
       
        return {
            openingBalance,
            currentBalance,
            incomeRecipes, 
            incomeExpenses
        }
    }

    public getHistoryYearly(year: number, openingBalance: number, recipes: Entrada[], expenses: Saida[]): any[] {
        const historyYearly = [];

        let cumulativeBilling = openingBalance;
        let monthlyBiiling = 0;

        for(let month = 0; month < 12; month++) {
            let transactions = this.getTransactionsByMonth(year, month, recipes, expenses);    
            let { incomeRecipes, incomeExpenses } = this.getIncome(transactions.recipes, transactions.expenses);

            cumulativeBilling +=  (incomeRecipes - incomeExpenses);
            monthlyBiiling = incomeRecipes - incomeExpenses;

            cumulativeBilling = parseInt(cumulativeBilling.toFixed(1));
            monthlyBiiling  = parseInt(monthlyBiiling.toFixed(1));

            historyYearly.push(
                { cumulativeBilling, monthlyBiiling }
            );
        }
        return historyYearly;
    }

    public getIncomeYearly(year: number, recipes: Entrada[], expenses: Saida[]): any[] {
        const incomeMontly = [];

        for(let month = 0; month < 12; month++) {
            let transactions = this.getTransactionsByMonth(year, month, recipes, expenses);
            let { incomeRecipes, incomeExpenses } = this.getIncome(transactions.recipes, transactions.expenses);

            incomeMontly.push({
                incomeRecipes, 
                incomeExpenses
            });
        }
        return incomeMontly;
    }

    public getReportMonthly(year: number, month: number, recipes: Entrada[], expenses: Saida[]) {
        const transactions = this.getTransactionsByMonth(year, month, recipes, expenses);

        const incomeMontly = this.getIncome(transactions.recipes, transactions.expenses);

        const incomeRecipesMonthly = incomeMontly.incomeRecipes;
        const incomeExpensesMonthly = incomeMontly.incomeExpenses;

        const balanceMonthly = incomeRecipesMonthly - incomeExpensesMonthly;
        
        recipes = transactions.recipes;
        expenses = transactions.expenses;

        return {
            recipes, 
            expenses,
            incomeRecipesMonthly,
            incomeExpensesMonthly,
            balanceMonthly 
        }
    }
}