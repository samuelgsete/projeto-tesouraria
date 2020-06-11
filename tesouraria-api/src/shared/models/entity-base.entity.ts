import { PrimaryGeneratedColumn } from "typeorm";
import { IsInt, IsOptional } from "class-validator";

export abstract class EntityBase {

    @IsOptional()
    @IsInt({ message: 'O ID deve ser inteiro' })
    @PrimaryGeneratedColumn({ type: 'int'})
    public readonly id: number;

    public constructor(values: Object = {}) { Object.assign(this, values) }
}