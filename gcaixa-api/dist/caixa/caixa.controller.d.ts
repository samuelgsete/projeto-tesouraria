import { CaixaService } from './caixa.service';
import { Caixa } from 'src/shared/models/caixa.entity';
export declare class CaixaController {
    private service;
    constructor(service: CaixaService);
    findPaginete(filtro: any, page: any): Promise<any[]>;
    findById(id: number): Promise<Caixa>;
    create(caixa: Caixa): Promise<{
        mensagem: string;
    }>;
    update(caixa: Caixa): Promise<{
        mensagem: string;
    }>;
    delete(id: number): Promise<{
        mensagem: string;
    }>;
}
