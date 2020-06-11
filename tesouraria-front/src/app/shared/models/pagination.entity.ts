export class Pagination {

    public pageCurrent: number = 1;
    public filter: string = '';
    public count: number;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}