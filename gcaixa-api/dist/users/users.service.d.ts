import { User } from 'src/shared/models/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private repository;
    constructor(repository: Repository<User>);
    findOne(username: string): Promise<User | undefined>;
    save(user: User): Promise<User>;
    update(user: User): Promise<{
        mensagem: string;
    }>;
}
