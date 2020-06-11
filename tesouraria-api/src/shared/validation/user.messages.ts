export class users {

    public static nomeNotNull = 'O nome não pode ser vázio';
    public static nomeLength = 'O nome deve conter no mínimo 2 e no máximo 15 caractares';
    public static nomeValid = 'O nome deve ser uma cadeia de caracteres';

    public static sobrenomeNotNull = 'O sobrenome não pode ser vázio';
    public static sobrenomeLength = 'O sobrenome deve conter no mínimo 2 e no máximo 15 caractares';
    public static sobrenomeValid = 'O sobrenome deve ser uma cadeia de caracteres';

    public static emailNotNull = 'O email não pode ser vázio';
    public static emailLength = 'O email deve conter no mínimo 10 e no máximo 30 caractares';
    public static readonly emailValid = 'O email deve ser válido';
    public static readonly emailCreated = 'O email já está em uso';

    public static readonly usernameNotNull = 'O usuário não pode ser vázio';
    public static readonly usernameLength = 'O usuário deve conter no mínimo 4 e no máximo 15 caractares';
    public static readonly usernameValid = 'O usuário deve ser uma cadeia de caracteres';
    public static readonly usernameCreated = 'O usuário já está em uso';

    public static readonly passwordNotNull = 'A senha não pode ser vázia';
    public static readonly passwordLength = 'A senha deve conter no mínimo 4 e no máximo 15 caractares';
    public static readonly passwordValid = 'A senha deve ser uma cadeia de caracteres';

    public static readonly whatzappNotNull = 'O whatzapp não pode ser vázio';
    public static readonly whatzappLength = 'O whatzapp deve conter no mínimo 10 caracteres e no máximo 15';
    public static readonly whatzappValid = 'O whatzapp deve ser válido';
}