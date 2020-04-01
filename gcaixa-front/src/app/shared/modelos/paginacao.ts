export class Paginacao {

    public count:number = 0
    public size: number = 6;
    public page: number = 1;
    public filter: string = '';

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}