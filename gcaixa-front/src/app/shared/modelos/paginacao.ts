export class Paginacao {

    public page: number = 1;
    public filter: string = '';
    public count: number = 0;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    public nextPage() {
        this.page++;
    }

    public previousPage() {
        this.page--; 
    }
}