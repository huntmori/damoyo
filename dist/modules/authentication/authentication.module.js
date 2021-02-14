"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const sequelize_1 = require("@nestjs/sequelize");
const users_module_1 = require("../users/users.module");
const refresh_token_model_1 = require("../../models/refresh-token.model");
const tokens_service_1 = require("./tokens.service");
const refresh_tokens_repository_1 = require("./refresh-tokens.repository");
const authentication_controller_1 = require("./authentication.controller");
let AuthenticationModule = class AuthenticationModule {
};
AuthenticationModule = __decorate([
    common_1.Module({
        imports: [
            sequelize_1.SequelizeModule.forFeature([
                refresh_token_model_1.RefreshToken
            ]),
            jwt_1.JwtModule.register({
                secret: 'SECRET',
                signOptions: {
                    expiresIn: '5m',
                }
            }),
            users_module_1.UsersModule,
        ],
        controllers: [
            authentication_controller_1.AuthenticationController,
        ],
        providers: [
            tokens_service_1.TokenService,
            refresh_tokens_repository_1.RefreshTokensRepository,
        ]
    })
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=authentication.module.js.map