import { RegisterRequest } from '../../request';
import { User } from '../../models/user.model';
import { UserRepository } from '../users/users.repository';
export declare class UsersService {
    private readonly users;
    constructor(users: UserRepository);
    validateCredentials(user: User, password: string): Promise<boolean>;
    createdUserFromRequest(request: RegisterRequest): Promise<User>;
    findForId(id: number): Promise<User | null>;
    findForUsername(username: string): Promise<User | null>;
}
