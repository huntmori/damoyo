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
exports.AuthenticationController = void 0;
const common_1 = require("@nestjs/common");
const request_1 = require("../../request");
const users_service_1 = require("../users/users.service");
const tokens_service_1 = require("./tokens.service");
let AuthenticationController = class AuthenticationController {
    constructor(users, tokens) {
        this.users = users;
        this.tokens = tokens;
    }
    async register(body) {
        const user = await this.users.createdUserFromRequest(body);
        const token = await this.tokens.generateAcessToken(user);
        const refresh = await this.tokens.generateRefreshToken(user, 60 * 60 * 24 * 30);
        const payload = this.buildResponsePayload(user, token, refresh);
        return {
            status: 'success',
            data: payload
        };
    }
    async login(body) {
        const { username, password } = body;
        const user = await this.users.findForUsername(username);
        const valid = user ? await this.users.validateCredentials(user, password) : false;
        if (!valid) {
            throw new common_1.UnauthorizedException('The login is invalid');
        }
        const token = await this.tokens.generateAcessToken(user);
        const refresh = await this.tokens.generateRefreshToken(user, 60 * 60 * 24 * 30);
        const payload = this.buildResponsePayload(user, token, refresh);
        return {
            status: 'success',
            data: payload,
        };
    }
    async refresh(body) {
        const { user, token } = await this.tokens.createAccessTokenFromRefreshToken(body.refresh_token);
        const payload = this.buildResponsePayload(user, token);
        return {
            status: 'success',
            data: payload
        };
    }
    buildResponsePayload(user, accessToken, refreshToken) {
        return {
            user: user,
            payload: Object.assign({ type: 'bearer', token: accessToken }, (refreshToken ? { refresh_token: refreshToken } : {}))
        };
    }
};
__decorate([
    common_1.Post('/register'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_1.RegisterRequest]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "register", null);
__decorate([
    common_1.Post('/login'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_1.LoginRequest]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "login", null);
__decorate([
    common_1.Post('/refresh'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_1.RefreshRequest]),
    __metadata("design:returntype", Promise)
], AuthenticationController.prototype, "refresh", null);
AuthenticationController = __decorate([
    common_1.Controller('/api/auth'),
    __metadata("design:paramtypes", [users_service_1.UsersService, tokens_service_1.TokenService])
], AuthenticationController);
exports.AuthenticationController = AuthenticationController;
//# sourceMappingURL=authentication.controller.js.map