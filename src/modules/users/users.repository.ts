import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { hash } from 'bcrypt';
import { col, fn, where } from 'sequelize';
import { User } from '../../models/user.model';

@Injectable()
export class UserRepository
{
    private readonly users: typeof User;

    public constructor(@InjectModel(User) users: typeof User) {
        this.users = users;
    }

    public async findForId(id: number): Promise<User | null> {
        return this.users.findOne({
            where:{
                id,
            },
        });
    }

    public async findForUserName(username: string): Promise<User|null>{
        return this.users.findOne({
            where:{
                username:where(fn('lower', col('username')), username),
            },
        });
    }

    public async create(username: string, password: string): Promise<User>
    {
        const user = new User();
        user.username = username;
        user.password = await hash(password, 10);

        return user.save();
    }
}
