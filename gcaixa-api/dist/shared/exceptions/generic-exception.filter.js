"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenericExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const Id_invalid_exception_1 = require("./modelos/Id-invalid.exception");
const permission_denied_excepton_1 = require("./modelos/permission-denied.excepton");
const treasury_not_foud_exception_1 = require("./modelos/treasury-not-foud.exception");
let GenericExceptionFilter = (() => {
    let GenericExceptionFilter = class GenericExceptionFilter {
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
    GenericExceptionFilter = __decorate([
        common_1.Catch(Id_invalid_exception_1.IdInvalidException, permission_denied_excepton_1.PermissionDeniedException, treasury_not_foud_exception_1.TreasuryNotFoundException)
    ], GenericExceptionFilter);
    return GenericExceptionFilter;
})();
exports.GenericExceptionFilter = GenericExceptionFilter;
//# sourceMappingURL=generic-exception.filter.js.map