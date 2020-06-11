import { TransactionType } from './enums/transaction-type.enum';

export class Expense {

    public id: number;
    public description: string;
    public value: number;
    public registeredIn: Date;
    public type: TransactionType;
    public details: string;

    public constructor(values: Object = {}) { Object.assign(this, values) }
}