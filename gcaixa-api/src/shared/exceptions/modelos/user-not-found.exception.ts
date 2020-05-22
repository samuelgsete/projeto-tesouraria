export class UserNotFoundException extends Error {
    public constructor(message: string) {
        super(message);
    }
}