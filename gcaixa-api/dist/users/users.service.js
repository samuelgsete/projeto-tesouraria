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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../shared/models/user.entity");
const typeorm_2 = require("typeorm");
const Id_invalid_exception_1 = require("../shared/exceptions/modelos/Id-invalid.exception");
let UsersService = class UsersService {
    constructor(repository) {
        this.repository = repository;
    }
    async findOne(username) {
        let result = await this.repository.find({ where: { username: username } });
        let user = result[0];
        return user;
    }
    async save(user) {
        return this.repository.save(user);
    }
    async update(user) {
        if (user.id == null || user.id <= 0) {
            throw new Id_invalid_exception_1.IdInvalidException("O id informado é invalído");
        }
        return this.repository
            .save(user)
            .then(e => {
            return {
                mensagem: 'Atualizado com sucesso'
            };
        });
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map