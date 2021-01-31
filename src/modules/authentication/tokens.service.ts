import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOptions, TokenExpiredError } from 'jsonwebtoken';
import { RefreshToken } from 'src/models/refresh-token.model';

import { User } from '../../models/user.model';
import { UserRepository } from '../users/users.repository';

import { RefreshTokensRepository } from './refresh-tokens.repository';

const BASE_OPTIONS: SignOptions = {
    issuer:'',
    audience: ''
}

export interface RefreshTokenPayload{
    jti: number;
    sub: number; 
}

@Injectable()
export class TokenService
{
    private readonly tokens: RefreshTokensRepository;
    private readonly users: UserRepository;
    private readonly jwt : JwtService;

    public constructor(tokens: RefreshTokensRepository, users: UserRepository, jwt: JwtService)
    {
        this.tokens = tokens;
        this.users = users;
        this.jwt = jwt;
    }

    public async generateAcessToken (user: User): Promise<string>
    {
        const opts: SignOptions = {
            ...BASE_OPTIONS,
            subject: String(user.id),
        };

        return this.jwt.signAsync({}, opts);
    }

    public async generateRefreshToken (user: User, expiresIn: number): Promise<string>
    {
        const token = await this.tokens.createRefreshToken(user, expiresIn);

        const opts: SignOptions = {
            ...BASE_OPTIONS,
            expiresIn,
            subject: String(user.id),
            jwtid: String(token.id)
        }

        return this.jwt.signAsync({}, opts);
    }

    public async resolveRefreshToken(encoded: string): Promise<{user: User, token: RefreshToken}>
    {
        const payload = await this.decodedRefreshToken(encoded);
        const token = await this.getStoredTokenFromRefreshTokenPayload(payload);

        if(!token)
        {
            throw new UnprocessableEntityException('Refresh token not found');
        }
        
        if(token.is_revoked)
        {
            throw new UnprocessableEntityException('Refresh token revoked');
        }

        const user = await this.getUserFromRefreshTokenPayload(payload);

        if( !user) 
        {
            throw new UnprocessableEntityException('Refresh token malformed');
        }

        return {user, token};
    }

    public async createAccessTokenFromRefreshToken(refresh: string): Promise<{token: string, user: User}>
    {
        const { user } = await this.resolveRefreshToken(refresh);

        const token = await this.generateAcessToken(user);

        return {user, token};
    }

    public async decodedRefreshToken(token: string): Promise<RefreshTokenPayload>
    {
        try
        {
            return this.jwt.verifyAsync(token);
        }
        catch(e)
        {
            if( e instanceof TokenExpiredError)
            {
                throw new UnprocessableEntityException('Refresh token expired');
            }
            else
            {
                throw new UnprocessableEntityException('Refresh token malforemd');
            }
        }
    }

    private async getUserFromRefreshTokenPayload(payload: RefreshTokenPayload): Promise<User>
    {
        const subId = payload.sub;

        if (!subId)
        {
            throw new UnprocessableEntityException('Refresh token malformed');
        }

        return this.users.findForId(subId);
    }

    private async getStoredTokenFromRefreshTokenPayload(payload: RefreshTokenPayload): Promise<RefreshToken | null>
    {
        const tokenId = payload.jti;

        if(!tokenId)
        {
            throw new UnprocessableEntityException('Refresh token malformed');
        }

        return this.tokens.findTokenById(tokenId);
    }
}