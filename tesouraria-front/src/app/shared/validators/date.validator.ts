import { FormControl } from "@angular/forms";
import * as moment from "moment";

export class DateValidator {
    public validate(): any {
        return (control: FormControl): { [key: string]: any } => {
            const date = moment(control.value, 'DDMMYYYY', true);
            if(!date.isValid()){
                return { invalidDate: true };
            }
            return null;
        };
      }
}