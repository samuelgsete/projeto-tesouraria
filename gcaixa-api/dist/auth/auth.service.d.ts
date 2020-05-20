import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    user: any;
    constructor(usersService: UserService, jwtService: JwtService);
    validateUser(username: string, pass: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
        name_user: any;
    }>;
}
