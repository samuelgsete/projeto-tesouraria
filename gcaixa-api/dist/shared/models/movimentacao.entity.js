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
const typeorm_1 = require("typeorm");
const EntidadeBase_1 = require("./EntidadeBase");
class Movimentacao extends EntidadeBase_1.EntidadeBase {
}
__decorate([
    typeorm_1.Column({ length: 100, unique: false, nullable: false }),
    __metadata("design:type", String)
], Movimentacao.prototype, "descricao", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ unique: false, nullable: false }),
    __metadata("design:type", Date)
], Movimentacao.prototype, "registro", void 0);
__decorate([
    typeorm_1.Column({ unique: false, nullable: false }),
    __metadata("design:type", Number)
], Movimentacao.prototype, "valor", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: ["ENTRADA", "SAIDA"],
        unique: false,
        nullable: false
    }),
    __metadata("design:type", String)
], Movimentacao.prototype, "tipo", void 0);
exports.Movimentacao = Movimentacao;
//# sourceMappingURL=movimentacao.entity.js.map