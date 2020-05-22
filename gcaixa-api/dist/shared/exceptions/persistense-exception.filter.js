"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let PersistenceExceptionFilter = class PersistenceExceptionFilter {
    catch(ex, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const detalhes = this.generateMessageError(ex);
        console.log(ex);
        response
            .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
            .json({
            codigo: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
            tipo: ex.name,
            detalhes: detalhes
        });
    }
    generateMessageError(ex) {
        let message = '';
        if (ex.code == TypeError.NOT_NULL) {
            message += "A propriedade '" + ex.column + "' não pode ser nula";
        }
        else if (ex.code == TypeError.UNIQUE) {
            message += "O valor já foi cadastrada";
        }
        else if (ex.code == TypeError.LONG_VALUE) {
            message += "O valor contém uma cadeia de caractares muito longa";
        }
        else if (ex.code == TypeError.NOT_INTEGER) {
            message += "O valor precisa ser numérico";
        }
        return message;
    }
};
PersistenceExceptionFilter = __decorate([
    common_1.Catch(typeorm_1.QueryFailedError)
], PersistenceExceptionFilter);
exports.PersistenceExceptionFilter = PersistenceExceptionFilter;
var TypeError;
(function (TypeError) {
    TypeError["NOT_NULL"] = "23502";
    TypeError["UNIQUE"] = "23505";
    TypeError["LONG_VALUE"] = "22001";
    TypeError["NOT_INTEGER"] = "22P02";
})(TypeError = exports.TypeError || (exports.TypeError = {}));
//# sourceMappingURL=persistense-exception.filter.js.map