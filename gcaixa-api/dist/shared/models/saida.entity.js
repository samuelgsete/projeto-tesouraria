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
exports.Saida = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const tesouraria_entity_1 = require("./tesouraria.entity");
const entidade_base_1 = require("./entidade-base");
const expenses_messages_1 = require("../validation/expenses.messages");
let Saida = (() => {
    let Saida = class Saida extends entidade_base_1.EntidadeBase {
        constructor(values = {}) {
            super();
            Object.assign(this, values);
        }
    };
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${expenses_messages_1.expenses.descriptionNotNul}` }),
        class_validator_1.Length(3, 60, { message: `${expenses_messages_1.expenses.descriptionLength}` }),
        class_validator_1.IsString({ message: `${expenses_messages_1.expenses.descriptionValid}` }),
        typeorm_1.Column({ length: 60, unique: false, nullable: false }),
        __metadata("design:type", String)
    ], Saida.prototype, "descricao", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${expenses_messages_1.expenses.valueNotNull}` }),
        class_validator_1.IsNumber({}, { message: `${expenses_messages_1.expenses.valueValid}` }),
        typeorm_1.Column({ type: 'float', unique: false, nullable: false }),
        __metadata("design:type", Number)
    ], Saida.prototype, "valor", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${expenses_messages_1.expenses.dateNotNull}` }),
        class_validator_1.IsDateString({ message: `${expenses_messages_1.expenses.dateValid}` }),
        typeorm_1.Column({ type: 'timestamp', nullable: false, default: new Date() }),
        __metadata("design:type", Date)
    ], Saida.prototype, "registradoEm", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.Length(3, 255, { message: `${expenses_messages_1.expenses.detailsLength}` }),
        class_validator_1.IsString({ message: `${expenses_messages_1.expenses.detailsValid}` }),
        typeorm_1.Column({ length: 255, unique: false, nullable: true }),
        __metadata("design:type", String)
    ], Saida.prototype, "detalhes", void 0);
    __decorate([
        typeorm_1.Column({
            type: "enum",
            enum: ['RECEITA', 'DESPESA'],
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
    return Saida;
})();
exports.Saida = Saida;
//# sourceMappingURL=saida.entity.js.map