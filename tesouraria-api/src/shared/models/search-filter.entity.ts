export class SearchFilter {

    public word: string;
    public page: number;

    constructor(_word: string, _page: number) {
        this.word =  (_word == null || _word == "")? "%%" : "%" + _word + "%";
        this.page = _page <=0 ? 1: _page;
    }

    public nextPage() {
        return (this.page - 1) * 6;
    }
}