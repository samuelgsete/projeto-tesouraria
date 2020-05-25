"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExceptionFilter = (() => {
    let HttpExceptionFilter = class HttpExceptionFilter {
        catch(ex, host) {
            const ctx = host.switchToHttp();
            const response = ctx.getResponse();
            const status = ex.getStatus();
            const request = ctx.getRequest();
            let message = ex.message.message;
            console.log(ex.message.message[0].constraints);
            if (typeof ex.message.message == 'object') {
                message = ex.message.message[0].constraints.length;
                console.log(ex.message.message[0].constraints.isDefined);
            }
            response
                .status(status)
                .json({
                codigo: status,
                tipo: ex.message.error,
                detalhes: message,
                caminho: request.url
            });
        }
    };
    HttpExceptionFilter = __decorate([
        common_1.Catch(common_1.BadRequestException, common_1.NotFoundException, common_1.InternalServerErrorException, common_1.ForbiddenException, common_1.UnauthorizedException)
    ], HttpExceptionFilter);
    return HttpExceptionFilter;
})();
exports.HttpExceptionFilter = HttpExceptionFilter;
//# sourceMappingURL=http-exception.filter.js.map