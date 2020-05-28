export class TreasuryNotFoundException extends Error {
    public constructor(message: string) {
        super(message);
    }
}