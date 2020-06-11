import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidationException extends HttpException {

    public errors: any;

    public constructor(message: string, code: HttpStatus, errors: any) {
        super(message, code);
        this.errors = errors;
    }
}