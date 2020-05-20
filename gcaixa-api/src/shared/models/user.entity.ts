import { Entity,Column } from "typeorm";
import { EntidadeBase } from "./entidade-base";

@Entity()
export class User extends EntidadeBase {

    @Column({ length: 30, unique: false, nullable: false })
    public name: string;

    @Column({ length: 30, unique: false, nullable: false })
    public surname: string;

    @Column({ length: 60, unique: true, nullable: false })
    public email: string;

    @Column({ length: 20, unique: true, nullable: false })
    public username: string;

    @Column({ length: 20, unique: false, nullable: false })
    public password: string;

    public constructor(values: Object = {}) {
        super();
        Object.assign(this, values);
    }
}