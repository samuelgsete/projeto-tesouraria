import { Entity,Column } from "typeorm";
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { EntidadeBase } from "./entidade-base";
import { users } from "../validation/user.messages";

@Entity()
export class User extends EntidadeBase {

    @IsString({ message: `${users.nomeValid}` })
    @Length(2, 15, { message: `${users.nomeLength}` })
    @IsNotEmpty({ message: `${users.nomeNotNull}` })
    @Column({ length: 15, unique: false, nullable: false })
    public name: string;

    @IsString({ message: `${users.sobrenomeValid}` })
    @Length(2, 15, { message: `${users.sobrenomeLength}` })
    @IsNotEmpty({message: `${users.nomeNotNull}`})
    @Column({ length: 15, unique: false, nullable: false })
    public surname: string;

    @IsNotEmpty({message: `${users.emailNotNull}` })
    @Length(10, 30, { message: `${users.emailLength}`})
    @IsEmail({}, { message:  `${users.emailValid}`})
    @Column({ length: 30, unique: true, nullable: false })
    public email: string;

    @IsString({ message: `${users.usernameValid}`})
    @Length(4, 15, { message: `${users.usernameLength}`})
    @IsNotEmpty({message: `${users.usernameNotNull}`})
    @Column({ length: 15, unique: true, nullable: false })
    public username: string;

    @IsString({ message: `${users.passwordValid}`})
    @Length(4, 15, { message: `${users.passwordLength}`})
    @IsNotEmpty({message: `${users.passwordNotNull}`})
    @Column({ length: 15, unique: false, nullable: false })
    public password: string;

    @Column({ default: true })
    public readonly isActive: boolean;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}