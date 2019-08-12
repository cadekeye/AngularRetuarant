import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';


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
