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
const caixa_entity_1 = require("./caixa.entity");
const credito_entity_1 = require("./credito.entity");
const entidade_base_1 = require("./entidade-base");
let Entrada = class Entrada extends entidade_base_1.EntidadeBase {
    constructor(values = {}) {
        super();
        this.tipo = "ENTRADA";
        Object.assign(this, values);
    }
    atualizarEntrada() {
        let _valor = 0;
        this.creditos.forEach(c => {
            if (c.situacao === 'QUITADO') {
                _valor += c.valor;
                c.situacao = 'ENCERRADO';
            }
        });
        this.valor += _valor;
    }
};
__decorate([
    typeorm_1.Column({ length: 120, unique: false, nullable: false }),
    __metadata("design:type", String)
], Entrada.prototype, "descricao", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', unique: false, nullable: false }),
    __metadata("design:type", Number)
], Entrada.prototype, "valor", void 0);
__decorate([
    typeorm_1.Column({ length: 120, unique: false, nullable: true }),
    __metadata("design:type", String)
], Entrada.prototype, "ofertante", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Entrada.prototype, "registro", void 0);
__decorate([
    typeorm_1.Column({
        type: "enum",
        enum: ["ENTRADA", "SAIDA"],
        unique: false, nullable: false
    }),
    __metadata("design:type", String)
], Entrada.prototype, "tipo", void 0);
__decorate([
    typeorm_1.OneToMany(type => credito_entity_1.Credito, credito => credito.entrada, { cascade: true }),
    __metadata("design:type", Array)
], Entrada.prototype, "creditos", void 0);
__decorate([
    typeorm_1.Column({ length: 255, unique: false, nullable: true }),
    __metadata("design:type", String)
], Entrada.prototype, "observacoes", void 0);
__decorate([
    typeorm_1.ManyToOne(type => caixa_entity_1.Caixa, caixa => caixa.entradas, { onDelete: "CASCADE" }),
    __metadata("design:type", caixa_entity_1.Caixa)
], Entrada.prototype, "caixa", void 0);
Entrada = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Entrada);
exports.Entrada = Entrada;
//# sourceMappingURL=entrada.entity.js.map