import { UnprocessableEntityException, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { RegisterRequest } from '../../request';

import { User } from '../../models/user.model';

import { UserRepository } from '../users/users.repository';

@Injectable()
export class UsersService
{
    private readonly users: UserRepository;

    public constructor(users: UserRepository)
    {
        this.users = users;
    }

    public async validateCredentials (user: User, password: string): Promise<boolean>
    {
        return compare(password, user.password);
    }
    //commit test
    public async createdUserFromRequest(request: RegisterRequest): Promise<User>
    {
        const { username, password } = request;

        const existingFromUsername = await this.findForUsername(request.username);

        if(existingFromUsername)
        {
            throw new UnprocessableEntityException('Username already in use');
        }

        return this.users.create(username, password);
    }

    public async findForId(id: number): Promise<User | null>
    {
        return this.users.findForId(id);
    }

    public async findForUsername (username: string): Promise<User | null>
    {
        return this.findForUsername(username);
    }
}
