import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from 'src/shared/models/user.entity';
import { Repository } from 'typeorm';
import { IsCreatedEception } from 'src/shared/exceptions/models/is-created.exception';
import { IdInvalidException } from 'src/shared/exceptions/models/Id-invalid.exception';
import { EmailService } from 'src/shared/services/email.service';

@Injectable()
export class UserService {

    public constructor(
                        @InjectRepository(User) private repository: Repository<User>,
                        private readonly emailService: EmailService
    ) { }

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

        const code = this.generateVerificationCode();
        user.codeVerify = code;

        this.emailService.verifyUser(user.name, user.email, user.codeVerify);

        return this.repository
                    .save(user)
                    .then( e => {
                        return {
                            message: 'Aguardando confirmação'
                        };
                    }) 
    }

    public async confirmUser(code: string) {
        const result = await this.repository.find({ where: { codeVerify: code }});
        let user = result[0];
        if(user) {
            user.isActive = true;
            return this.repository
                .save(user)
                .then( e => {
                    return {
                        message: 'Criado com sucesso'
                    }
                })
        }
        throw new IdInvalidException('Codigo de verificação inválido');
    }

    public async resendCode(email: string) {
        const result = await this.repository.find({ where: { email: email }});
        const user = result[0];

        if(!user) {
            throw new HttpException('Usuário não está cadastrado', HttpStatus.NOT_FOUND);
        }

        const code = this.generateVerificationCode();
        user.codeVerify = code;

        this.emailService.verifyUser(user.name, user.email, user.codeVerify);

        return this.repository
                    .save(user)
                    .then( () => {
                        return {
                            message: 'Código reenviado'
                        };
                    });
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

    private generateVerificationCode(): string {
        return `${Math.floor(Math.random()*90000) + 10000}`;
    }
}