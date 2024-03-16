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

  cats: string[] = [
    'Electronics',
    'Non-electronics',
  ];

  // E
  subCats: string[] = [
    'Laptop',
    'Internet Dongle',
    'Big Monitor',
  ];


  // subCatsNE: string[] = [
  //   'Cycles',
  //   'Books',
  // ];

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
        // this.itemsArray.push(new DisplayObject(
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

      console.log('New data to be added:', newData);
      
      this._dataService.updateFormData(newData);

      this.form.reset();
      this.routeToDataTable();

    }
  }

  // getRequiredError(){
  //   return "This is required.";
  // }
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





  // TODO: USE SESSION STORAGE APPROACH, THINK ABOUT SERVICE LATER

      // ADD PROPER LOGIC TO PUT IN ARRAY AND SEND TO OTHER DISPLAY COMPONENT
      
      // and then store everything in session storage and then redirect to the display page


      // TODO: ACCESS HOW MANY QUANTITY
   
// TODO: optional parameters in contructor and how to have model and specifications as maps..?
