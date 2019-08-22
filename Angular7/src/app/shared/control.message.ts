import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';


@Component({
    template: `<div *ngIf="errorMessages !== null"></div>`,
    // tslint:disable-next-line:component-selector
    selector: 'control-message'
})
// tslint:disable-next-line:component-class-suffix
export class ControlMessage {
    errorMessage: string;

    config = {
        'required': 'Required',
        'invalidCreditCard': 'Is invalid credit card number',
        'invalidEmailAddress': 'Invalid email address',
        'invalidPassword': 'Invalid password. Password must be at least 6 characters long, and contain a number.',
        'minlength': `Minimum length`
      };

    @Input() control: FormControl;
 constructor() {}

 get errorMessages() {
    for (let propertyName in this.control.errors) {
        if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
            return this.config[propertyName];
        }
    }
    return null;
 }
}

export class CustomValidator {
    static emailDomain(domainName: string) {
        return (control: AbstractControl): {[key: string]: any} | null => {
        const email = control.value;
        const domain = email.substring(email.lastIndexOf('@') + 1);

        if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
          return null;
        }
        return {'emailDomain': true};
      };
    }

    static matchEmail(group: AbstractControl): {[key: string]: any} | null {
        const emailControl = group.get('email');
        const confirmEmailControl = group.get('confirmEmail');

        if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) {
          return null;
        } else {
          return {'emailMismatch': true};
        }
    }
}


