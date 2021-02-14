import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from 'src/models/refresh-token.model';
import { User } from '../../models/user.model';
import { UserRepository } from '../users/users.repository';
import { RefreshTokensRepository } from './refresh-tokens.repository';
export interface RefreshTokenPayload {
    jti: number;
    sub: number;
}
export declare class TokenService {
    private readonly tokens;
    private readonly users;
    private readonly jwt;
    constructor(tokens: RefreshTokensRepository, users: UserRepository, jwt: JwtService);
    generateAcessToken(user: User): Promise<string>;
    generateRefreshToken(user: User, expiresIn: number): Promise<string>;
    resolveRefreshToken(encoded: string): Promise<{
        user: User;
        token: RefreshToken;
    }>;
    createAccessTokenFromRefreshToken(refresh: string): Promise<{
        token: string;
        user: User;
    }>;
    decodedRefreshToken(token: string): Promise<RefreshTokenPayload>;
    private getUserFromRefreshTokenPayload;
    private getStoredTokenFromRefreshTokenPayload;
}
