"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokensRepository = void 0;
const common_1 = require("@nestjs/common");
const refresh_token_model_1 = require("../../models/refresh-token.model");
let RefreshTokensRepository = class RefreshTokensRepository {
    async createRefreshToken(user, ttl) {
        const token = new refresh_token_model_1.RefreshToken();
        token.user_id = user.id;
        token.is_revoked = false;
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + ttl);
        token.expires = expiration;
        return token.save();
    }
    async findTokenById(id) {
        return refresh_token_model_1.RefreshToken.findOne({
            where: {
                id,
            }
        });
    }
};
RefreshTokensRepository = __decorate([
    common_1.Injectable()
], RefreshTokensRepository);
exports.RefreshTokensRepository = RefreshTokensRepository;
//# sourceMappingURL=refresh-tokens.repository.js.map