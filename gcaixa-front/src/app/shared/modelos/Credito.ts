export class Credito {
    
    public id: number;
    public titular: string;
    public valor: number;
    public situacao: TipoSituacao;

    constructor(values: Object = {}) {
        Object.assign(this, values);
    }
}

export type TipoSituacao = "QUITADO" | "ABERTO" | "ENCERRADO";