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
const protudo_entity_1 = require("./protudo.entity");
const venda_entity_1 = require("./venda.entity");
let Pedido = class Pedido extends EntidadeBase_1.EntidadeBase {
    constructor(values = {}) {
        super();
        Object.assign(this, values);
    }
};
__decorate([
    typeorm_1.Column({ length: 160, unique: false, nullable: true }),
    __metadata("design:type", String)
], Pedido.prototype, "titular", void 0);
__decorate([
    typeorm_1.Column({ type: 'money', unique: false, nullable: false }),
    __metadata("design:type", Number)
], Pedido.prototype, "valor", void 0);
__decorate([
    typeorm_1.ManyToMany(type => protudo_entity_1.Produto),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Pedido.prototype, "produtos", void 0);
__decorate([
    typeorm_1.ManyToOne(type => venda_entity_1.Venda, venda => venda.pedidos, { onDelete: "CASCADE" }),
    __metadata("design:type", venda_entity_1.Venda)
], Pedido.prototype, "venda", void 0);
Pedido = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Object])
], Pedido);
exports.Pedido = Pedido;
//# sourceMappingURL=pedido.entity.js.map