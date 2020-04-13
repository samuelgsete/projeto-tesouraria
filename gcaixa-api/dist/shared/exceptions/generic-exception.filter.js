"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const insufficient_funds_exception_1 = require("./modelos/insufficient-funds.exception");
const Id_invalid_exception_1 = require("./modelos/Id-invalid.exception");
let GenericaExceptionsFilter = class GenericaExceptionsFilter {
    catch(ex, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        response
            .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
            codigo: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            tipo: ex.name,
            detalhes: ex.message
        });
    }
};
GenericaExceptionsFilter = __decorate([
    common_1.Catch(insufficient_funds_exception_1.InsufficientFunds, Id_invalid_exception_1.IdInvalidException)
], GenericaExceptionsFilter);
exports.GenericaExceptionsFilter = GenericaExceptionsFilter;
//# sourceMappingURL=generic-exception.filter.js.map