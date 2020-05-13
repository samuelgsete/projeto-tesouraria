export class Usuario {

    public username: string;
    public password: string;
    public nome: string;
    public sobrenome: string;
    public email: string;
    public whatzapp: number;

    public constructor(values: Object = {}) { Object.assign(this, values) }
}