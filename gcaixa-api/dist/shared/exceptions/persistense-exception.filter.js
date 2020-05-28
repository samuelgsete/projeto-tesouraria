"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PersistenceExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let PersistenceExceptionFilter = (() => {
    let PersistenceExceptionFilter = class PersistenceExceptionFilter {
        catch(ex, host) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            const detalhes = 'Houve um erro na escrita dos dados';
            console.log(ex);
            response
                .status(common_1.HttpStatus.INTERNAL_SERVER_ERROR)
                .json({
                status: common_1.HttpStatus.INTERNAL_SERVER_ERROR,
                details: detalhes,
                redirect: true
            });
        }
    };
    PersistenceExceptionFilter = __decorate([
        common_1.Catch(typeorm_1.QueryFailedError)
    ], PersistenceExceptionFilter);
    return PersistenceExceptionFilter;
})();
exports.PersistenceExceptionFilter = PersistenceExceptionFilter;
//# sourceMappingURL=persistense-exception.filter.js.map