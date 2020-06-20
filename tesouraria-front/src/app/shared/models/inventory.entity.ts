export class Inventory{

    public id: number;
    public actualBalance: number;
    public currentBalance: number;
    public discrepancy: number;
    public registeredIn: Date;

    public constructor(values: Object = {}) { Object.assign(this, values) }
}