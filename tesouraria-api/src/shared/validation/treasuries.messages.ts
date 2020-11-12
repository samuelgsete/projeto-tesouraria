export class treasuries {

    public static readonly nameNotNull = 'O nome não pode ser vázio';
    public static readonly nameLength = 'O nome deve conter no mínimo 4 e no máximo 30 caractares';
    public static readonly nameValid = 'O nome deve ser uma cadeia de caracteres';
     
    public static readonly initialAmountNotNull = 'O montante inicial não pode ser nulo';
    public static readonly initialAmountValid = 'O montante inicial deve ser numérico';
    public static readonly initialAmountMax = 'O montante inicial dever no máximo R$ 100000';
    public static readonly initialAmountMin = 'O montante inicial não pode ser negativo';

    public static readonly detailsValid = 'Os detalhes devem ser uma cadeia de caracteres';
    public static readonly detailsLength = 'Os detalhes devem conter no mínimo 4 e no máximo 255 caractares';
}