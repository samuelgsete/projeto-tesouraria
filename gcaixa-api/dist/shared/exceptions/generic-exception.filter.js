"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const Id_invalid_exception_1 = require("./modelos/Id-invalid.exception");
const user_not_found_exception_1 = require("./modelos/user-not-found.exception");
const permission_denied_excepton_1 = require("./modelos/permission-denied.excepton");
const treasury_not_foud_exception_1 = require("./modelos/treasury-not-foud.exception");
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
    common_1.Catch(Id_invalid_exception_1.IdInvalidException, user_not_found_exception_1.UserNotFoundException, permission_denied_excepton_1.PermissionDeniedException, treasury_not_foud_exception_1.TreasuryNotFoundException)
], GenericaExceptionsFilter);
exports.GenericaExceptionsFilter = GenericaExceptionsFilter;
//# sourceMappingURL=generic-exception.filter.js.map