"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const EntidadeBase_1 = require("./EntidadeBase");
const typeorm_1 = require("typeorm");
let Produto = class Produto extends EntidadeBase_1.EntidadeBase {
    constructor(values = {}) {
        super();
        Object.assign(this, values);
    }
};
__decorate([
    typeorm_1.Column({ length: 120, unique: true, nullable: false }),
    __metadata("design:type", String)
], Produto.prototype, "descricao", void 0);
__decorate([
    typeorm_1.Column({ type: 'money', unique: false, nullable: false }),
    __metadata("design:type", Number)
], Produto.prototype, "custo", void 0);
__decorate([
    typeorm_1.Column({ length: 300, unique: false, nullable: true }),
    __metadata("design:type", String)
], Produto.prototype, "detalhes", void 0);
Produto = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Produto);
exports.Produto = Produto;
//# sourceMappingURL=protudo.entity.js.map