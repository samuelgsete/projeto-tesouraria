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
exports.Entrada = void 0;
const typeorm_1 = require("typeorm");
const tesouraria_entity_1 = require("./tesouraria.entity");
const credito_entity_1 = require("./credito.entity");
const entidade_base_1 = require("./entidade-base");
const class_validator_1 = require("class-validator");
const recipes_messages_1 = require("../validation/recipes.messages");
const class_transformer_1 = require("class-transformer");
let Entrada = (() => {
    let Entrada = class Entrada extends entidade_base_1.EntidadeBase {
        constructor(values = {}) {
            super();
            Object.assign(this, values);
        }
    };
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${recipes_messages_1.recipes.descriptionNotNul}` }),
        class_validator_1.Length(3, 60, { message: `${recipes_messages_1.recipes.descriptionLength}` }),
        class_validator_1.IsString({ message: `${recipes_messages_1.recipes.descriptionValid}` }),
        typeorm_1.Column({ length: 60, unique: false, nullable: false }),
        __metadata("design:type", String)
    ], Entrada.prototype, "descricao", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${recipes_messages_1.recipes.valueNotNull}` }),
        class_validator_1.IsNumber({}, { message: `${recipes_messages_1.recipes.valueValid}` }),
        typeorm_1.Column({ type: 'float', unique: false, nullable: false }),
        __metadata("design:type", Number)
    ], Entrada.prototype, "valor", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsString({ message: `${recipes_messages_1.recipes.offererValid}` }),
        class_validator_1.Length(3, 60, { message: `${recipes_messages_1.recipes.offererLength}` }),
        typeorm_1.Column({ length: 60, unique: false, nullable: true }),
        __metadata("design:type", String)
    ], Entrada.prototype, "ofertante", void 0);
    __decorate([
        typeorm_1.Column({
            type: 'enum',
            enum: ['RECEITA', 'DESPESA'],
            unique: false, nullable: false
        }),
        __metadata("design:type", String)
    ], Entrada.prototype, "tipo", void 0);
    __decorate([
        class_validator_1.ValidateNested(),
        class_transformer_1.Type(() => credito_entity_1.Credito),
        typeorm_1.OneToMany(type => credito_entity_1.Credito, credito => credito.entrada, { cascade: true }),
        __metadata("design:type", Array)
    ], Entrada.prototype, "creditos", void 0);
    __decorate([
        class_validator_1.IsNotEmpty({ message: `${recipes_messages_1.recipes.dateNotNull}` }),
        class_validator_1.IsDateString({ message: `${recipes_messages_1.recipes.dateValid}` }),
        typeorm_1.Column({ type: 'timestamp', nullable: false, default: new Date() }),
        __metadata("design:type", Date)
    ], Entrada.prototype, "registradoEm", void 0);
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.Length(3, 255, { message: `${recipes_messages_1.recipes.detailsLength}` }),
        class_validator_1.IsString({ message: `${recipes_messages_1.recipes.detailsValid}` }),
        typeorm_1.Column({ length: 255, unique: false, nullable: true }),
        __metadata("design:type", String)
    ], Entrada.prototype, "detalhes", void 0);
    __decorate([
        typeorm_1.ManyToOne(type => tesouraria_entity_1.Tesouraria, tesouraria => tesouraria.entradas, { onDelete: "CASCADE" }),
        __metadata("design:type", tesouraria_entity_1.Tesouraria)
    ], Entrada.prototype, "tesouraria", void 0);
    Entrada = __decorate([
        typeorm_1.Entity(),
        __metadata("design:paramtypes", [Object])
    ], Entrada);
    return Entrada;
})();
exports.Entrada = Entrada;
//# sourceMappingURL=entrada.entity.js.map