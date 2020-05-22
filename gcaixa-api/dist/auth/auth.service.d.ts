import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { User } from 'src/shared/models/user.entity';
export declare class AuthService {
    private usersService;
    private jwtService;
    user: User;
    constructor(usersService: UserService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: User): Promise<{
        access_token: string;
        name_user: string;
        user_id: number;
    }>;
}
