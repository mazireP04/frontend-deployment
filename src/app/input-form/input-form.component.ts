import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { DataService } from '../data.service';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss']
})
export class InputFormComponent implements OnInit {

  form: FormGroup;
  itemsArray: Array<DisplayObject> = [];

  
  categories = new Map<string, Array<string>>(
    [
      ['Electronics', ["Laptop", "Internet Dongle", "Big Monitor"]],
      ['Non-Electronics', ["Laptop Bag", "Notebook"],]
    ]
  );


  constructor(private fb: FormBuilder, private router: Router, private _dataService: DataService) {
    this.form = this.fb.group({
      category: ['', Validators.required],
      subCategory: [''],
      models: this.fb.group({
        modelName: ['', Validators.required],
        modelMemory: ['', Validators.required],
      }),
      specifications: this.fb.group({
        specificationWarranty: ['', Validators.required],
        specificationMemoryDetails: ['', Validators.required],
        specificationScreenSize: ['', Validators.required],
      }),
      quantity: [ , Validators.required],
      price: ['', Validators.required],
    });
  }

  ngOnInit() {}

  routeToDataTable(){
    this.router.navigate(['/inventories']);
  }
  onSubmit() {
    const newData = [];

    if (this.form.valid) {
      for (let i = 0; i < this.form.value.quantity; i++) {
        newData.push(new DisplayObject(
          uuidv4(),
          this.form.value.category,
          this.form.value.subCategory,
          this.form.value.models.modelName,
          this.form.value.models.modelMemory,
          this.form.value.specifications.specificationWarranty,
          this.form.value.specifications.specificationMemoryDetails,
          this.form.value.specifications.specificationScreenSize,
          this.form.value.price,
        ));
      }

      // console.log(this.itemsArray);
      // sessionStorage.setItem('displayArray', JSON.stringify(this.itemsArray));

      // const currentData = this._dataService.getFormData();
      // const updatedData = [...currentData, ...newData];

      
      // console.log('New data to be added:', newData);
      
      this._dataService.updateFormData(newData);

      this.form.reset();
      this.routeToDataTable();

    }
  }

}

class DisplayObject {
  constructor(
    public id: string = '',
    public category: string = '',
    public subCategory: string = '',
    public modelName: string = '',
    public modelMemory: string = '',
    public specificationWarranty: string = '',
    public specificationMemoryDetails: string = '',
    public specificationScreenSize: string = '',
    public price: string = '',
    public assignedTo: string = 'none',
    public status: string = 'available',
  ) {}

}


