import { User } from '../../models/user.model';
export declare class UserRepository {
    private readonly users;
    constructor(users: typeof User);
    findForId(id: number): Promise<User | null>;
    findForUserName(username: string): Promise<User | null>;
    create(username: string, password: string): Promise<User>;
}
