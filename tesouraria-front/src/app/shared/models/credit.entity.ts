import { StatusType } from './enums/status-type.enum';

export class Credit {
    
    public id: number;
    public holder: string;
    public value: number;
    public registeredIn: Date;
    public telephone: string;
    public status: StatusType;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}