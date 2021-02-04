import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { LoginRequest, RegisterRequest } from '../../request';
import { User } from '../../models/user.model';
import { UsersService } from '../users/users.service';
import { TokenService } from './tokens.service';
import { access } from 'fs';

export interface AuthenticationPayload{
    user: User;
    payload: {
        type: string;
        token: string;
        refresh_token?: string;
    }
}

@Controller('/api/auth')
export class AuthenticationController
{
    private readonly users: UsersService;
    private readonly tokens: TokenService;

    public constructor(users: UsersService, tokens: TokenService)
    {
        this.users = users;
        this.tokens = tokens;
    }

    @Post('/register')
    public async register(@Body() body: RegisterRequest)
    {
        const user = await this.users.createdUserFromRequest(body);

        const token = await this.tokens.generateAcessToken(user);

        const refresh = await this.tokens.generateRefreshToken(user, 60*60*24*30);

        const payload = this.buildResponsePayload(user, token, refresh);

        return {
            status: 'success',
            data: payload
        }
    }

    @Post('/login')
    public async login(@Body() body: LoginRequest)
    {
        const { username, password } = body;

        const user = await this.users.findForUsername(username);
        const valid = user ? await this.users.validateCredentials(user, password) : false;

        if (!valid)
        {
            throw new UnauthorizedException('The login is invalid');
        }

        const token = await this.tokens.generateAcessToken(user);
        const refresh = await this.tokens.generateRefreshToken(user, 60*60*24*30);

        const payload = this.buildResponsePayload(user, token, refresh);

        return {
            status: 'success',
            data: payload,
        };
    }

    private buildResponsePayload(user: User, accessToken: string, refreshToken?: string): AuthenticationPayload
    {
        return {
            user: user,
            payload: {
                type: 'bearer',
                token: accessToken,
                ...(refreshToken ? { refresh_token : refreshToken}: {}),
            }
        };
    }
}