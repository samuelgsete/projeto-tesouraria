import { FormControl } from '@angular/forms';

export class ResetStateFormValidator {
    public validate(control: FormControl) {
        if (control.value == '') {
            control.setValue(null);
        }
        return null;
    }
}