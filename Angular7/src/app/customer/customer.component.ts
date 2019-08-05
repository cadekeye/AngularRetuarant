import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CustomerService } from '../shared/customer.service';
import { Customer } from '../shared/customer.model';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
 formData: Customer;
 isValid: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data,
  public dialogRef: MatDialogRef<CustomerComponent>,
  private customerService: CustomerService) { }

  ngOnInit() {
    this.reSetForm();
  }

  onSubmit(form: NgForm) {
    if (this.validateForm(form.value)) {
      this.customerService.addNewCustomer(this.formData);
      this.reSetForm();
    }
  }

  reSetForm() {
    this.formData = {
      CustomerID: null,
      Name: ''
    };
  }

  validateForm(formData: Customer) {
    this.isValid = true;
    if (formData.CustomerID === 0) {
      this.isValid = false;
    }

    return this.isValid;
  }

}
