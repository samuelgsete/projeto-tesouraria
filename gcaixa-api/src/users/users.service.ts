import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
    private readonly users: User[];

    constructor() {
        this.users = [
            {
                userId: 1,
                username: 'danilo',
                password: 'oficinag3',
            },
            {
                userId: 2,
                username: 'samuel',
                password: 'gsete',
            },
            {
                userId: 3,
                username: 'layla',
                password: '1234',
            },
        ];
    }

    public async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
