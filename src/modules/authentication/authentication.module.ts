//app/modules/authentication/authentication.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';

import { UsersModule } from '../users/users.module';

import { RefreshToken } from '../../models/refresh-token.model';

import { TokenService } from './tokens.service';
import { RefreshTokensRepository } from './refresh-tokens.repository';

import { AuthenticationController } from './authentication.controller';

@Module({
    imports: [
        SequelizeModule.forFeature([
            RefreshToken
        ]),
        JwtModule.register({
            secret:'SECRET',
            signOptions: {
                expiresIn: '5m',
            }
        }),
        UsersModule,
    ],
    controllers: [
        AuthenticationController,
    ],
    providers: [
        TokenService,
        RefreshTokensRepository,
    ]
})
export class AuthenticationModule{}