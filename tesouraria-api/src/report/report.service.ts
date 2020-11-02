import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import * as ejs from 'ejs';
import * as moment from 'moment';

import { Treasury } from "src/shared/models/treasury.entity";
import { Recipe } from "src/shared/models/recipe.entity";
import { Expense } from "src/shared/models/expense.entity";
import { IdInvalidException } from "src/shared/exceptions/models/Id-invalid.exception";
import { TreasuryNotFoundException } from "src/shared/exceptions/models/treasury-not-foud.exception";
import { PermissionDeniedException } from "src/shared/exceptions/models/permission-denied.excepton";

const ALL_MONTHS = 12;

@Injectable()
export class ReportService {

    public constructor(@InjectRepository(Treasury) private readonly repositoryTreasury: Repository<Treasury>) {}

    public async getReport(treasuryId: number, userId: number, year: number, month: number): Promise<any> {
        if(treasuryId <= 0 || userId <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        const treasury = await this.repositoryTreasury.findOne(treasuryId, { relations: ["expenses", "recipes"] });

        if(!treasury) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        if(month == ALL_MONTHS) {
            return this.getReportYearly(year, treasury.recipes, treasury.expenses);
        }

        const report = this.getReportMonthly(year, month, treasury.recipes, treasury.expenses);
        return report;
    }

    public async downloadReport(treasuryId: number, userId: number, year: number, month: number) {
        const  options =  { format: 'A4', orientation: 'landscape' };
        let document = '';
        const months = [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril', 
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outrubo', 
            'Novembro',
            'Dezembro'
        ];

        if(treasuryId <= 0 || userId <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        const treasury = await this.repositoryTreasury.findOne(treasuryId, { relations: ["expenses", "recipes"] });

        if(!treasury) {
            throw new TreasuryNotFoundException("Tesouraria inexistente");
        }

        if(treasury.userId != userId) {
            throw new PermissionDeniedException('Permissão negada')
        }

        const income = {
            initialAmount: treasury.initialAmount,
            currentBalance: treasury.currentBalance,
            incomeRecipes:  treasury.incomeRecipes,
            incomeExpenses: treasury.incomeExpenses
        }

        if(month == ALL_MONTHS) {
            const annualReport = this.getReportYearly(year, treasury.recipes, treasury.expenses);

            ejs.renderFile('src/report/annual-report-template.ejs', { moment: moment,  income: income, annualReport: annualReport, year: year, months: months }, (err, html) => {
                if(err) {
                    throw new Error('Não foi possivel renderizar o documento');
                }
                else {
                    document = html;  
                }
            }); 
            return document;
        }

        const report = this.getReportMonthly(year, month, treasury.recipes, treasury.expenses);
       

        const monthSelected = months[month];

        ejs.renderFile('src/report/report-template.ejs', { moment: moment,  income: income, report: report, year: year, month: monthSelected }, (err, html) => {
            if(err) {
                throw new Error('Não foi possivel renderizar o documento');
            }
            else {
                document = html;  
            }
        }); 
        return document;  
    }




    private getReportMonthly(year: number, month: number, recipes: Recipe[], expenses: Expense[]) {
       

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

    private getReportYearly(year: number, recipes: Recipe[], expenses: Expense[]) {
        const annualReport = [];

        for(let month = 0; month < ALL_MONTHS; month++) {
            annualReport.push(this.getReportMonthly(year, month, recipes, expenses));
        }

        return annualReport;
        
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