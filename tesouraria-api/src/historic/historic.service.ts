import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Treasury } from "src/shared/models/treasury.entity";
import { Recipe } from "src/shared/models/recipe.entity";
import { Expense } from "src/shared/models/expense.entity";
import { IdInvalidException } from "src/shared/exceptions/models/Id-invalid.exception";
import { TreasuryNotFoundException } from "src/shared/exceptions/models/treasury-not-foud.exception";
import { PermissionDeniedException } from "src/shared/exceptions/models/permission-denied.excepton";

@Injectable()
export class HistoricService {
    
    public constructor(@InjectRepository(Treasury) private readonly repositoryTreasury: Repository<Treasury>) {}

    public async getHistoric(treasuryId: number, userId: number, year: number) {
        if(treasuryId <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        const treasury = await this.repositoryTreasury.findOne(treasuryId, { relations: ["expenses", "recipes"] });
        
        if(treasury == null) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        const incomeYearly = this.getIncomeTransactions(year, treasury.recipes, treasury.expenses);
        const historyYearly = this.getHistorcBilling(year, treasury.initialAmount, treasury.recipes, treasury.expenses);
             
        return { incomeYearly, historyYearly }
    }

    private getHistorcBilling(year: number, initialAmount: number, recipes: Recipe[], expenses: Expense[]): any[] {
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

    private getIncomeTransactions(year: number, recipes: Recipe[], expenses: Expense[]): any[] {
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

    private getTransactionsByMonth(year: number, month: number, recipes: Recipe[], expenses: Expense[]): any {
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
}