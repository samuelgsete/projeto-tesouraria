export class FiltroBusca {

    public palavra: string;
    public page: number;

    constructor(_palavra: string, _page: number) {
        this.palavra =  (_palavra == null || _palavra == "")? "%%" : "%" + _palavra + "%";
        this.page = _page <=0 ? 1: _page;
    }

    public nextPage() {
        return (this.page - 1) * 6;
    }
}