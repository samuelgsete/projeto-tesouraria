import { HttpException, HttpStatus } from "@nestjs/common";

export class IsCreatedEception extends HttpException {
    
    public constructor(message: string, code: HttpStatus) {
        super(message, code);
    }
}