import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/shared/models/user.entity';
import { Repository } from 'typeorm';
import { IsCreatedEception } from 'src/shared/exceptions/models/is-created.exception';
import { IdInvalidException } from 'src/shared/exceptions/models/Id-invalid.exception';

@Injectable()
export class UserService {

    public constructor(@InjectRepository(User) private repository: Repository<User>) { }

    public async findById(id: number): Promise<User> {
        if(id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        return this.repository.findOne(id);
    }

    public async findByUserName(username: string): Promise<User | undefined> {
        let result = await this.repository.find({ where: { username: username }});
        let user = result[0];
        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        let result = await this.repository.find({ where: { email: email }});
        let user = result[0];
        return user;
    }

    public async save(user: User) {
        let result = await this.findByUserName(user.username);

        if(result) {
            throw new IsCreatedEception('O usuário já está sendo utilizado', HttpStatus.BAD_REQUEST);
        }

        result = await this.findByEmail(user.email);

        if(result) {
            throw new IsCreatedEception('O email já está sendo utilizado', HttpStatus.BAD_REQUEST);
        }

        return this.repository
                    .save(user)
                    .then( e => {
                        return {
                            message: 'Criado com sucesso'
                        };
                    }) 
    }

    public async update(user: User) {
        if(user.id == null || user.id <= 0) {
            throw new IdInvalidException('O ID informado é inválido')
        }

        let result = await this.findByUserName(user.username);

        if(result) {
            if(result.id != user.id){
                throw new IsCreatedEception('O usuário já está sendo utilizado', HttpStatus.BAD_REQUEST);
            } 
        }

        result = await this.findByEmail(user.email);

        if(result) {
            if(result.id != user.id){
                throw new IsCreatedEception('O email já está sendo utilizado', HttpStatus.BAD_REQUEST);
            }
        }

        return this.repository
                    .save(user)
                    .then( e => {
                        return {
                            message: 'Atualizado com sucesso'
                        };
                    }); 
    }
}