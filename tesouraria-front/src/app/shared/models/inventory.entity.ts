export class Inventory{

    public id: number;
    public actualBalance: number;
    public registeredIn: Date;

    public constructor(values: Object = {}) { Object.assign(this, values) }
}