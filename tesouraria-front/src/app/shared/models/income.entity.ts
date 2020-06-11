export class Income {

    public initialAmount: number = 0;
    public currentBalance: number = 0;
    public incomeRecipes: number = 0;
    public incomeExpenses: number = 0;

    public constructor(values: Object = {}) { Object.assign(this, values) }
}