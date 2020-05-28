export class PermissionDeniedException extends Error {
    public constructor(message: string) {
        super(message)
    }
}