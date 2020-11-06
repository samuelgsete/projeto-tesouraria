import { FormControl } from '@angular/forms';

export class NoWhiteSpaceValidator {
    public validate(control: FormControl) {
        if (control && control.value && !control.value.replace(/\s/g, '').length) {
            control.setValue('');
        }
        return null;
    }
}