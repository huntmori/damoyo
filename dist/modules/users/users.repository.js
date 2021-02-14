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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const sequelize_1 = require("@nestjs/sequelize");
const bcrypt_1 = require("bcrypt");
const sequelize_2 = require("sequelize");
const user_model_1 = require("../../models/user.model");
let UserRepository = class UserRepository {
    constructor(users) {
        this.users = users;
    }
    async findForId(id) {
        return this.users.findOne({
            where: {
                id,
            },
        });
    }
    async findForUserName(username) {
        return this.users.findOne({
            where: {
                username: sequelize_2.where(sequelize_2.fn('lower', sequelize_2.col('username')), username),
            },
        });
    }
    async create(username, password) {
        const user = new user_model_1.User();
        user.username = username;
        user.password = await bcrypt_1.hash(password, 10);
        return user.save();
    }
};
UserRepository = __decorate([
    common_1.Injectable(),
    __param(0, sequelize_1.InjectModel(user_model_1.User)),
    __metadata("design:paramtypes", [Object])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=users.repository.js.map