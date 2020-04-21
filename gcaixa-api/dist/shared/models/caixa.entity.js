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
const saida_entity_1 = require("./saida.entity");
const entrada_entity_1 = require("./entrada.entity");
const entidade_base_1 = require("./entidade-base");
const insufficient_funds_exception_1 = require("../exceptions/modelos/insufficient-funds.exception");
const contagem_entity_1 = require("./contagem.entity");
let Caixa = class Caixa extends entidade_base_1.EntidadeBase {
    constructor(values = {}) {
        super();
        Object.assign(this, values);
    }
    atualizarSaldo() {
        let _saldo = 0;
        this.entradas.forEach(e => {
            e.atualizarEntrada();
            _saldo += e.valor;
        });
        this.saidas.forEach(s => {
            if (this.ePossivelRetirar(s.valor)) {
                _saldo -= s.valor;
            }
            else {
                throw new insufficient_funds_exception_1.InsufficientFunds('Saldo insuficiente para realizar a retirada');
            }
        });
        this.saldoAtual = this.saldoInicial + _saldo;
    }
    ePossivelRetirar(valor) {
        if (valor > this.saldoAtual) {
            return false;
        }
        return true;
    }
};
__decorate([
    typeorm_1.Column({ length: 120, unique: true, nullable: false }),
    __metadata("design:type", String)
], Caixa.prototype, "nome", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', unique: false, nullable: false }),
    __metadata("design:type", Number)
], Caixa.prototype, "saldoInicial", void 0);
__decorate([
    typeorm_1.Column({ type: 'float', unique: false, nullable: false }),
    __metadata("design:type", Number)
], Caixa.prototype, "saldoAtual", void 0);
__decorate([
    typeorm_1.OneToMany(type => saida_entity_1.Saida, saida => saida.caixa, { cascade: true }),
    __metadata("design:type", Array)
], Caixa.prototype, "saidas", void 0);
__decorate([
    typeorm_1.OneToMany(type => entrada_entity_1.Entrada, entrada => entrada.caixa, { cascade: true }),
    __metadata("design:type", Array)
], Caixa.prototype, "entradas", void 0);
__decorate([
    typeorm_1.OneToMany(type => contagem_entity_1.Contagem, contagem => contagem.caixa, { cascade: true }),
    __metadata("design:type", Array)
], Caixa.prototype, "contagens", void 0);
__decorate([
    typeorm_1.Column({ length: 255, unique: false, nullable: true }),
    __metadata("design:type", String)
], Caixa.prototype, "observacoes", void 0);
Caixa = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Caixa);
exports.Caixa = Caixa;
//# sourceMappingURL=caixa.entity.js.map