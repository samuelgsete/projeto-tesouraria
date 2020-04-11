export class Usuario {

    public username: string;
    public password: string;

    public constructor(values: Object = {}) { Object.assign(this, values) }
}