import { Model } from 'sequelize-typescript';
export declare class RefreshToken extends Model<RefreshToken> {
    user_id: number;
    is_revoked: boolean;
    expires: Date;
}
