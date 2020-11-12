import { ExceptionFilter, ArgumentsHost, Catch, HttpStatus } from "@nestjs/common";
import { Response } from 'express';

import { ValidationException } from "./models/validation.exception";

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
    
    private constraints = [];

    catch(ex: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
    
        const errors = ex.errors;
        this.getConstraintsResponsive(errors);
        let message = this.getMessage(this.constraints[0]);
        this.constraints = [];
     
        response
            .status(HttpStatus.BAD_REQUEST)
            .json({
                status: HttpStatus.BAD_REQUEST,
                details: message,
                redirect: false
            });
    }

    public getConstraintsResponsive(errors: any[]) {
        errors.forEach(error => {
            if(error.constraints){
                this.constraints.push(error.constraints);
            }
            if(error.children) {
                this.getConstraintsResponsive(error.children);
            }
        });
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

        if(constraints.isDateString) {
            return constraints.isDateString;
        }

        if(constraints.isOptional) {
            return constraints.isOptional;
        }

        if(constraints.max) {
            return constraints.max;
        }

        if(constraints.min) {
            return constraints.min;
        }

        return '';
    }
}