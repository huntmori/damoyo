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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const users_repository_1 = require("../users/users.repository");
let UsersService = class UsersService {
    constructor(users) {
        this.users = users;
    }
    async validateCredentials(user, password) {
        return bcrypt_1.compare(password, user.password);
    }
    async createdUserFromRequest(request) {
        const { username, password } = request;
        const existingFromUsername = await this.findForUsername(request.username);
        if (existingFromUsername) {
            throw new common_1.UnprocessableEntityException('Username already in use');
        }
        return this.users.create(username, password);
    }
    async findForId(id) {
        return this.users.findForId(id);
    }
    async findForUsername(username) {
        return this.findForUsername(username);
    }
};
UsersService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_repository_1.UserRepository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map