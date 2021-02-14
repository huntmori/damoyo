// app/modules/users/users.module.ts

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { User } from '../../models/user.model';

import { UsersService } from './users.service';
import { UserRepository } from './users.repository';

@Module({
    imports: [
        SequelizeModule.forFeature([
            User,
        ]),
    ],
    providers: [
        UsersService,
        UserRepository,
    ],
    exports: [
        UsersService,
        UserRepository
    ],
})

export class UsersModule {}