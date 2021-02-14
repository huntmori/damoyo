import { LoginRequest, RefreshRequest, RegisterRequest } from '../../request';
import { User } from '../../models/user.model';
import { UsersService } from '../users/users.service';
import { TokenService } from './tokens.service';
export interface AuthenticationPayload {
    user: User;
    payload: {
        type: string;
        token: string;
        refresh_token?: string;
    };
}
export declare class AuthenticationController {
    private readonly users;
    private readonly tokens;
    constructor(users: UsersService, tokens: TokenService);
    register(body: RegisterRequest): Promise<{
        status: string;
        data: AuthenticationPayload;
    }>;
    login(body: LoginRequest): Promise<{
        status: string;
        data: AuthenticationPayload;
    }>;
    refresh(body: RefreshRequest): Promise<{
        status: string;
        data: AuthenticationPayload;
    }>;
    private buildResponsePayload;
}
