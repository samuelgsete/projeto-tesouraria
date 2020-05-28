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
exports.Credito = void 0;
const typeorm_1 = require("typeorm");
const entrada_entity_1 = require("./entrada.entity");
const entidade_base_1 = require("./entidade-base");
const class_validator_1 = require("class-validator");
const credits_messages_1 = require("../validation/credits.messages");
let Credito = (() => {
    let Credito = class Credito extends entidade_base_1.EntidadeBase {
        constructor(values = {}) {
            super();
            Object.assign(this, values);
        }
    };
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${credits_messages_1.credits.holderNotNul}` }),
        class_validator_1.Length(2, 60, { message: `${credits_messages_1.credits.holderLength}` }),
        class_validator_1.IsString({ message: `${credits_messages_1.credits.holderValid}` }),
        typeorm_1.Column({ length: 60, unique: false, nullable: false }),
        __metadata("design:type", String)
    ], Credito.prototype, "titular", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${credits_messages_1.credits.valueNotNull}` }),
        class_validator_1.IsNumber({}, { message: `${credits_messages_1.credits.valueValid}` }),
        typeorm_1.Column({ type: 'float', unique: false, nullable: false }),
        __metadata("design:type", Number)
    ], Credito.prototype, "valor", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${credits_messages_1.credits.phoneNotNul}` }),
        class_validator_1.Length(10, 15, { message: `${credits_messages_1.credits.phoneLength}` }),
        class_validator_1.IsString({ message: `${credits_messages_1.credits.phoneValid}` }),
        typeorm_1.Column({ length: 15, unique: false, nullable: true }),
        __metadata("design:type", String)
    ], Credito.prototype, "telefone", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Credito.prototype, "registro", void 0);
    __decorate([
        typeorm_1.Column({
            type: "enum",
            enum: ["QUITADO", "ABERTO", "ENCERRADO"],
            default: "ABERTO",
            unique: false, nullable: true
        }),
        __metadata("design:type", String)
    ], Credito.prototype, "situacao", void 0);
    __decorate([
        typeorm_1.ManyToOne(type => entrada_entity_1.Entrada, entrada => entrada.creditos, { onDelete: "CASCADE" }),
        __metadata("design:type", entrada_entity_1.Entrada)
    ], Credito.prototype, "entrada", void 0);
    Credito = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Object])
    ], Credito);
    return Credito;
})();
exports.Credito = Credito;
//# sourceMappingURL=credito.entity.js.map