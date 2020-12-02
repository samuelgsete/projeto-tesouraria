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

        this.emailService.verifyUser(user.name, user.surname, user.email, user.codeVerify);

        await this.repository.save(user);
    }        

    public async confirmUser(code: string) {
        const result = await this.repository.find({ where: { codeVerify: code }});
        let user = result[0];
        if(user) {
            user.isActive = true;
            await this.repository.save(user);
            return;
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

        this.emailService.verifyUser(user.name, user.surname, user.email, user.codeVerify);

        await this.repository.save(user);
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

        await this.repository.save(user);
    }

    public async recoverAccount(email: string) {
        const user = await this.findByEmail(email);
        if(user) {
            user.codeVerify = this.generateVerificationCode();
            this.emailService.recoverUser(user.name, user.surname, user.email, user.codeVerify);
            await this.repository.save(user);
            return { name: user.name, surname: user.surname, username: user.username };
        }
        throw new HttpException('O email não está cadastrado', HttpStatus.BAD_REQUEST);
    }

    public async finalizeRecover(newUsername: string, newPassowrd: string, code: string) {
        const result = await this.repository.find({ where: { codeVerify: code }});
        let user = result[0];
        if(user) {
            user.isActive = true;
            user.username = newUsername;
            user.password = newPassowrd;
            await this.repository.save(user);
            return;
        }
        throw new HttpException('Codigo de verificação inválido', HttpStatus.BAD_REQUEST);
    }

    private generateVerificationCode(): string {
        return `${Math.floor(Math.random()*90000) + 10000}`;
    }
}