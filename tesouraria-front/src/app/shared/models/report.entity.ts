import { Recipe } from './recipe.entity';
import { Expense } from './expense.entity';

export class Report {

    public balanceMonthly: number = 0;
    public incomeRecipesMonthly: number = 0;
    public incomeExpensesMonthly: number = 0;
    public recipesCategorized: any[] = [];
    public expenses: Expense[] = []; 

    public constructor(values: Object = {}) { Object.assign(this, values) }
}