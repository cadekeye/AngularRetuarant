import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Customer } from './customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 formData: Customer;

  constructor(private http: HttpClient) { }

  getCustomerList(){
    return this.http.get(environment.apiURL + '/Customer').toPromise();
   }

   addNewCustomer(customer: Customer) {
     return this.http.post(environment.apiURL + '/Customer', customer).toPromise();
   }
}
