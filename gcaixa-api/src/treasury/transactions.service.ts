import { Injectable } from "@nestjs/common";

import { Recipe } from "src/shared/models/recipe.entity";
import { Expense } from "src/shared/models/expense.entity";
import { StatusType } from "src/shared/models/enums/status-type.enum";

@Injectable()
export class TransactionsService {
    
    public constructor() {}

    public updateBalance(recipes: Recipe[], expenses: Expense[], initialAmount: number): number {
        let balance = 0;

        recipes.forEach( recipe => {
            recipe = this.updateRecipe(recipe);
            balance += recipe.value;
        });

        expenses.forEach( expense => {
            balance -= expense.value;
        });

        return balance + initialAmount;
    }

    private updateRecipe(recipe: Recipe): Recipe {
        let value = 0;
        recipe.credits.forEach( credit => {
            if(credit.status === StatusType.SETTLED){
                value += credit.value;
                credit.status = StatusType.FINISHED;
            }
        });
        recipe.value += value;
        return recipe;
    }

    public getTransactionsByMonth(year: number, month: number, recipes: Recipe[], expenses: Expense[]): any {
        recipes = recipes.filter( recipe => {
            return recipe.registeredIn.getFullYear() == year && recipe.registeredIn.getMonth() == month;
        });

        expenses = expenses.filter( expense => {
            return expense.registeredIn.getFullYear() == year && expense.registeredIn.getMonth() == month;
        });

        return { recipes, expenses }
    }

    private getIncome(recipes: Recipe[], expenses: Expense[]): any {

        let incomeRecipes = 0

        recipes.forEach( recipe => {
            incomeRecipes += recipe.value;
        });

        let incomeExpenses = 0;

        expenses.forEach( expense => {
            incomeExpenses += expense.value;
        });

        return { incomeRecipes, incomeExpenses }
    }

    public getRecipeGeneral(recipes: Recipe[], expenses: Expense[], initialAmount: number, currentBalance: number): any {
 
        let { incomeRecipes, incomeExpenses } = this.getIncome(recipes, expenses);
       
        return {
            initialAmount,
            currentBalance,
            incomeRecipes, 
            incomeExpenses
        }
    }

    public getHistoryYearly(year: number, initialAmount: number, recipes: Recipe[], expenses: Expense[]): any[] {
        const historyYearly = [];

        let cumulativeBilling = initialAmount;
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

    public getIncomeYearly(year: number, recipes: Recipe[], expenses: Expense[]): any[] {
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

    public getReportMonthly(year: number, month: number, recipes: Recipe[], expenses: Expense[]) {
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