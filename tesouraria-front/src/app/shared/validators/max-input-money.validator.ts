import { FormControl } from '@angular/forms';

const MAX_VALUE = 100000;

export class MaxInputMoneyValidator {
    public validate(control: FormControl) {
        if(control.value <= 0 || control.value > MAX_VALUE) {
            return { invalidMoney: true };
        }
        return null;
    }
}