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
}
