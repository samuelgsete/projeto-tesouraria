import { PrimaryGeneratedColumn } from "typeorm";

export abstract class EntidadeBase {

    @PrimaryGeneratedColumn({ type: 'int'})
    public readonly id: number;

    public constructor(values: Object = {}) { Object.assign(this, values) }
}