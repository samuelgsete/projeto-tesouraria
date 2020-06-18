import { Recipe } from './recipe.entity';
import { Expense } from './expense.entity';
import { Inventory } from './inventory.entity';

export class Treasury {

    public id: number;
    public name: string;
    public initialAmount: number;
    public currentBalance: number;
    public recipes: Recipe[] = [];
    public expenses: Expense[] = [];
    public incomeRecipes: number;
    public incomeExpenses: number;
    public inventories: Inventory[] = [];
    public details: string;
    public updated: Date;
    public userId: number;

    public constructor(values: Object = {}) { Object.assign(this, values) }
}