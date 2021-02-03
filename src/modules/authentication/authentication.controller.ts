import { Body, Controller, Post } from '@nestjs/common';
import { RegisterRequest } from '../../request';
import { User } from '../../models/user.model';
import { UsersService } from '../users/users.service';
import { TokenService } from './tokens.service';

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

    }

    private buildResponsePayload(user: User, accessToken: string, refreshToken?: string): AuthenticationPayload
    {
        return null;
    }
}