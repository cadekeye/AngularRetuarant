import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  userForm: FormGroup;
  firstNameLenght = 0;

  constructor(private formBuilder: FormBuilder) {}

  validationMessages = {
    'firstName': {
      'required': 'First name is required.',
      'minlength': 'first name must be greater than 5 characters.',
      'maxlength': 'first name must be less than 10 characters.',
    },
    'lastName': {
      'required': 'Last name is required.',
    },
    'email': {
      'email': 'not a valid email',
      'emailDomain': 'email not valid domain'
    },
    'age': {
      'required': 'Age is required.'
    }
  };

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'age': ''
  };

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      lastName: ['', Validators.required],
      email: ['', [Validators.email, emailDomain('tech.com')]],
      age: ['', Validators.required]
    });

    this.userForm.valueChanges.subscribe(data => {
       this.logValidationErrors(this.userForm);
    });
  }

  saveForm() {
    this.logValidationErrors(this.userForm);

    if (this.userForm.dirty && this.userForm.valid) {
      const result = `First Name: ${this.userForm.value.firstName} Last Name: ${this.userForm.value.lastName}`;
      alert(result);
    }
  }

  logValidationErrors(fg: FormGroup = this.userForm) {
     Object.keys(fg.controls).forEach(key => {
       const abstractControl = fg.get(key);

       if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
       } else {
          this.formErrors[key] = '';
         if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
          const messages = this.validationMessages[key];

           for (const errorKey in abstractControl.errors) {
             if (errorKey) {
               this.formErrors[key] += messages[errorKey] + ' ';
             }
           }
         }
       }
     });
  }
}

function emailDomain(domainName: string) {
  return (control: AbstractControl): {[key: string]: any} | null => {
  const email = control.value;
  const domain = email.substring(email.lastIndexOf('@') + 1);

  if (email === '' || domain.toLowerCase() === domainName.toLowerCase()) {
    return null;
  }
  return {'emailDomain': true};
};
}
