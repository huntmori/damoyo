import { User } from '../../models/user.model';
import { RefreshToken } from '../../models/refresh-token.model';
export declare class RefreshTokensRepository {
    createRefreshToken(user: User, ttl: number): Promise<RefreshToken>;
    findTokenById(id: number): Promise<RefreshToken | null>;
}
