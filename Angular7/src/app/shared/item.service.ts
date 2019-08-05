import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Item } from './item.model';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) { }
  formData: Item;
  foodItems: Item[];

  getItemList() {
   return this.http.get(environment.apiURL + '/Item').toPromise().then(res => {
     this.foodItems = res as Item[];
   });
  }

  addnewItem(formData: Item) {
    return this.http.post(environment.apiURL + '/Item', formData).toPromise().then(res => {
      this.foodItems.push(formData);
    });
  }
}
