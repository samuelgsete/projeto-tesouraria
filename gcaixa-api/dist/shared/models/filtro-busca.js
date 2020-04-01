"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FiltroBusca {
    constructor(_palavra, _page) {
        this.palavra = (_palavra == null || _palavra == "") ? "%%" : "%" + _palavra + "%";
        this.page = _page <= 0 ? 1 : _page;
    }
    nextPage() {
        return (this.page - 1) * 6;
    }
}
exports.FiltroBusca = FiltroBusca;
//# sourceMappingURL=filtro-busca.js.map