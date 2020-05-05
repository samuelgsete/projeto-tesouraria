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
const tesouraria_entity_1 = require("./tesouraria.entity");
const entidade_base_1 = require("./entidade-base");
let Saida = class Saida extends entidade_base_1.EntidadeBase {
    constructor(values = {}) {
        super();
        this.tipo = "SAIDA";
        Object.assign(this, values);
    }
};
__decorate([
    typeorm_1.Column({ length: 120, unique: false, nullable: false }),
    __metadata("design:type", String)
], Saida.prototype, "descricao", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', unique: false, nullable: false }),
    __metadata("design:type", Number)
], Saida.prototype, "valor", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Saida.prototype, "registro", void 0);
__decorate([
    typeorm_1.Column({ length: 255, unique: false, nullable: true }),
    __metadata("design:type", String)
], Saida.prototype, "detalhes", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: ["ENTRADA", "SAIDA"],
        unique: false, nullable: false
    }),
    __metadata("design:type", String)
], Saida.prototype, "tipo", void 0);
__decorate([
    typeorm_1.ManyToOne(type => tesouraria_entity_1.Tesouraria, tesouraria => tesouraria.saidas, { onDelete: 'CASCADE' }),
    __metadata("design:type", tesouraria_entity_1.Tesouraria)
], Saida.prototype, "tesouraria", void 0);
Saida = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Saida);
exports.Saida = Saida;
//# sourceMappingURL=saida.entity.js.map