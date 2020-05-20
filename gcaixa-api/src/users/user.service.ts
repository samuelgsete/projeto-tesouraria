import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/shared/models/user.entity';
import { Repository } from 'typeorm';
import { IdInvalidException } from 'src/shared/exceptions/modelos/Id-invalid.exception';

@Injectable()
export class UserService {

    public constructor(@InjectRepository(User) private repository: Repository<User>) { }

    public async findOne(username: string): Promise<User | undefined> {
        let result = await this.repository.find({ where: { username: username } });
        let user = result[0];
        return user;
    }

    public async save(user: User) {
        return this.repository.save(user);  
    }

    public async update(user: User) {
        if(user.id == null || user.id <= 0) {
            throw new IdInvalidException("O id informado é invalído");
        }

        return this.repository
                    .save(user)
                    .then( e => {
                        return {
                            mensagem: 'Atualizado com sucesso'
                        };
                    }); 
    }
}
