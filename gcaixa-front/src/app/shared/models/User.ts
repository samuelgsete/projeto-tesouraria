export class User {

    public id: number;
    public username: string;
    public password: string;
    public name: string;
    public surname: string;
    public email: string;
    public whatzapp: string;
    public isActive: boolean;
    public updated: Date = new Date();

    public constructor(values: Object = {}) { Object.assign(this, values) }
}