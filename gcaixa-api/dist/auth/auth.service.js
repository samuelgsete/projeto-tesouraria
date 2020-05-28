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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../users/user.service");
const user_entity_1 = require("../shared/models/user.entity");
let AuthService = (() => {
    let AuthService = class AuthService {
        constructor(userService, jwtService) {
            this.userService = userService;
            this.jwtService = jwtService;
        }
        async validateUser(username, pass) {
            const user = await this.userService.findByUserName(username);
            if (!user) {
                throw new common_1.UnauthorizedException('Usuario não encontrado');
            }
            if (user && user.password === pass) {
                return user;
            }
            return null;
        }
        async login(user) {
            const payload = { username: user.username, sub: user.id };
            return {
                access_token: this.jwtService.sign(payload),
                name_user: user.name,
                user_id: user.id
            };
        }
    };
    AuthService = __decorate([
        common_1.Injectable(),
        __metadata("design:paramtypes", [user_service_1.UserService,
            jwt_1.JwtService])
    ], AuthService);
    return AuthService;
})();
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map