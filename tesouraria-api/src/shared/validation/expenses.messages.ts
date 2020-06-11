export class expenses {
    public static readonly descriptionNotNul = 'A descrição não pode ser nula';
    public static readonly descriptionLength = 'A descrição deve conter no mínimo 3 e no máximo 60 caracteres';
    public static readonly descriptionValid = 'A descrição deve ser uma cadeia de caracteres válida';

    public static readonly valueNotNull = 'O valor não pode ser nulo';
    public static readonly valueValid = 'O valor deve ser válido';

    public static readonly typeNotNull = 'O tipo de transação é obrigatório';
    public static readonly typeValid = 'O tipo de trasação deve ser uma cadeia de caracteres válida';

    public static readonly dateNotNull = 'A data de registro é obrigatória';
    public static readonly dateValid = 'A data de registro deve ser válida';

    public static readonly detailsValid = 'Os detalhes devem ser uma cadeia de caracteres válida';
    public static readonly detailsLength = 'Os detalhes devem conter no mínimo 3 e no máximo 255 caractares';
}