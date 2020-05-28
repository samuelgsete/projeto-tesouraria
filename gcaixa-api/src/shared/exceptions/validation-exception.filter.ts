import { ExceptionFilter, ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

import { ValidationException } from "./models/validation.exception";

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(ex: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
    
        const errors = ex.errors;
        const constraints = this.getContraints(errors);
        
        let message = this.getMessage(constraints[0]);

        response
            .status(HttpStatus.BAD_REQUEST)
            .json({
                status: HttpStatus.BAD_REQUEST,
                details: message,
                redirect: false
            });
    }

    public getContraints(errors: any[]) {
        let constraints = [];

        errors.forEach(error => {
            if(error.constraints) {
                constraints.push(error.constraints);
            }
            error.children.forEach( nivel1 => {
                if(nivel1.constraints) {
                    constraints.push(nivel1.constraints);
                }
                nivel1.children.forEach( nivel2 => {
                    if(nivel2.constraints) {
                        constraints.push(nivel2.constraints);
                    }
                    nivel2.children.forEach( nivel3 => {
                        if(nivel3.constraints) {
                            constraints.push(nivel3.constraints);
                        }
                        nivel3.children.forEach( nivel4 => {
                            if(nivel4.constraints) {
                                constraints.push(nivel4.constraints);
                            }
                        })
                    })
                 })
            });
        });
        return constraints;
    }

    public getMessage(constraints: any): string {
        if(!constraints) {
            return '';
        }
        
        if(constraints.isNotEmpty) {
            
            return constraints.isNotEmpty;
        }

        if(constraints.isString) {
            return constraints.isString;
        }

        if(constraints.isInt) {
            return constraints.isInt;
        }

        if(constraints.isNumber) {
            return constraints.isNumber;
        }

        if(constraints.length) {
            return constraints.length;
        }

        if(constraints.isEmail) {
            return constraints.isEmail;
        }

        if(constraints.isOptional) {
            return constraints.isOptional;
        }

        return '';
    }
}