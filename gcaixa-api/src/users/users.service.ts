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
                name: 'Danilo',
                password: 'oficinag3',
            },
            {
                userId: 2,
                username: 'samuel',
                name: 'Samuel',
                password: 'gsete',
            },
            {
                userId: 3,
                name: 'Layla',
                username: 'layla',
                password: '1234',
            },
            {
                userId: 4,
                name: 'Sharles',
                username: 'sharles',
                password: 'apaixonado',
            },
        ];
    }

    public async findOne(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }
}
