import { TransactionType } from "./enums/transaction-type.enum";

export class TransactionsFilter {

    public year: number;
    public month: number;
    public type: TransactionType;

    public constructor(values: Object = {}) { Object.assign(this, values) }
}