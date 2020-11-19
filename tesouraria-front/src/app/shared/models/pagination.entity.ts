export class Pagination {

    public pageCurrent: number = 1;
    public filter: string = '';
    public count: number;
    public readonly pageSize: number = 6;
    
    public constructor(values: Object = {}) {
        Object.assign(this, values);
    }

    public nextPage() {
        if(this.pageCurrent < this.count/this.pageSize) {
            this.pageCurrent++;
        }
    }

    public previousPage() {
        if(this.pageCurrent > 1) {
            this.pageCurrent--; 
        }
    }
}