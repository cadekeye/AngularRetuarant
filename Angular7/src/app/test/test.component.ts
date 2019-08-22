import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, ValidatorFn, FormArray, FormControl } from '@angular/forms';
import { CustomValidator } from '../shared/control.message';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

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
      'emailDomain': 'email not valid domain',
    },
    'confirmEmail': {
     'required': 'required',
    },
    'emailGroup': {
      'emailMismatch': 'email and confirm email do not match'
    },
    'age': {
      'required': 'Age is required.'
    }
  };

  formErrors = {
    'firstName': '',
    'lastName': '',
    'email': '',
    'confirmEmail': '',
    'emailGroup': '',
    'age': ''
  };

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(10)]],
      lastName: ['', Validators.required],
      emailGroup: this.formBuilder.group({
        email: ['', [Validators.email, CustomValidator.emailDomain('tech.com')]],
        confirmEmail: ['', Validators.required],
        }, {validator: CustomValidator.matchEmail}),
      age: ['', Validators.required],
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

       this.formErrors[key] = '';
       if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
        const messages = this.validationMessages[key];

         for (const errorKey in abstractControl.errors) {
           if (errorKey) {
             this.formErrors[key] += messages[errorKey] + ' ';
           }
         }

       if (abstractControl instanceof FormGroup) {
        this.logValidationErrors(abstractControl);
       }
       }
     });
  }

  loadData (): void {
    const formArray = new FormArray([
      new FormControl('john', [Validators.required]),
      new FormGroup({
        country: new FormControl('', Validators.required)
      }),
      new FormArray([
        new FormControl('test', Validators.required)
      ])
    ]);

    const formArray2 = this.formBuilder.array([
     new FormControl('John', Validators.required),
     new FormControl('IT', Validators.required),
     new FormControl('', Validators.required)
    ]);

    console.log(formArray2.at(0).valid);
    console.log(formArray2.valid);
    const n = formArray2.length;

    for (let i = 0; i < n; i++) {
      console.log(formArray2.at(i).value);
    }
  }
}
