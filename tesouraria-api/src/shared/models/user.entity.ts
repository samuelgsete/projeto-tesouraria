import { Entity,Column, UpdateDateColumn } from "typeorm";
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

import { EntityBase } from "./entity-base.entity";
import { users } from "../validation/user.messages";

@Entity()
export class User extends EntityBase {

    @IsNotEmpty({ message: `${users.nomeNotNull}` })
    @IsString({ message: `${users.nomeValid}` })
    @Length(2, 15, { message: `${users.nomeLength}` })
    @Column({ length: 15, unique: false, nullable: false })
    public name: string;

    @IsNotEmpty({message: `${users.nomeNotNull}`})
    @IsString({ message: `${users.sobrenomeValid}` })
    @Length(2, 15, { message: `${users.sobrenomeLength}` })
    @Column({ length: 15, unique: false, nullable: false })
    public surname: string;

    @IsNotEmpty({message: `${users.emailNotNull}` })
    @Length(10, 30, { message: `${users.emailLength}`})
    @IsEmail({}, { message:  `${users.emailValid}`})
    @Column({ length: 30, unique: true, nullable: false })
    public email: string;

    @IsNotEmpty({message: `${users.usernameNotNull}`})
    @IsString({ message: `${users.usernameValid}`})
    @Length(4, 15, { message: `${users.usernameLength}`})
    @Column({ length: 15, unique: true, nullable: false })
    public username: string;

    @IsNotEmpty({message: `${users.passwordNotNull}`})
    @IsString({ message: `${users.passwordValid}`})
    @Length(4, 15, { message: `${users.passwordLength}`})
    @Column({ length: 15, unique: false, nullable: false })
    public password: string;

    @IsNotEmpty({message: `${users.whatzappNotNull}`})
    @IsString({message: `${users.whatzappValid}`})
    @Length(10, 15, {message: `${users.whatzappValid}`})
    @Column({ length: 15, unique: false, nullable: false })
    public whatzapp: string;

    @Column({ default: false })
    public isActive: boolean;

    @Column()
    public codeVerify: string;

    @UpdateDateColumn()
    public updated: Date;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}