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
exports.EntidadeBase = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let EntidadeBase = (() => {
    class EntidadeBase {
        constructor(values = {}) { Object.assign(this, values); }
    }
    __decorate([
        class_validator_1.IsOptional(),
        class_validator_1.IsInt({ message: 'O ID deve ser inteiro' }),
        typeorm_1.PrimaryGeneratedColumn({ type: 'int' }),
        __metadata("design:type", Number)
    ], EntidadeBase.prototype, "id", void 0);
    return EntidadeBase;
})();
exports.EntidadeBase = EntidadeBase;
//# sourceMappingURL=entidade-base.js.map