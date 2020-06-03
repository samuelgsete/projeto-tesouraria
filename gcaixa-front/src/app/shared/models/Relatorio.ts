import { Entrada } from './Entrada';
import { Saida } from './Saida';

export class Relatorio {

    public balanceMonthly: number = 0;
    public incomeRecipesMonthly: number = 0;
    public incomeExpensesMonthly: number = 0;
    public recipes: Entrada[] = [];
    public expenses: Saida[] = []; 


    public constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}