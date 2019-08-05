import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { NgForm } from '@angular/forms';
import { Item } from '../shared/item.model';
import { ItemService } from '../shared/item.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  formData: Item;
  isValid: Boolean;
  foodItems: Item[];

  constructor(
    //@Inject (MAT_DIALOG_DATA) public data,
    //public dialogRef: MatDialogRef<ItemComponent>,
    private itemService: ItemService
    ) { }

  ngOnInit() {
    this.formData = this.itemService.formData;

   this.ResetForm();
  }



  AddNewItem(form: NgForm) {
    if (this.ValidateForm(form.value)) {
        this.itemService.addnewItem(this.formData).then(res => {
          this.ResetForm();
        });
    }
  }

  ResetForm() {
    this.formData = {
      ItemID: null,
      Name: '',
      Price: 0
    };
  }

  ValidateForm(formData: Item): Boolean {
    this.isValid = true;

    if (formData.ItemID === 0) {
      this.isValid = false;
    }
    return this.isValid;
  }

}
