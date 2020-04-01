import { Repository } from 'typeorm';
import { Caixa } from 'src/shared/models/caixa.entity';
import { FiltroBusca } from 'src/shared/models/filtro-busca';
export declare class CaixaService {
    private repositoryCaixa;
    constructor(repositoryCaixa: Repository<Caixa>);
    findAll(filtro: FiltroBusca): Promise<any>;
    findById(id: number): Promise<Caixa>;
    save(caixa: Caixa): Promise<{
        mensagem: string;
    }>;
    update(caixa: Caixa): Promise<{
        mensagem: string;
    }>;
    delete(id: number): Promise<{
        mensagem: string;
    }>;
}
