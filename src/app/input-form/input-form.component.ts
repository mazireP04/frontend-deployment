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
  // itemsArray: Array<DisplayObject> = [];


  categories = new Map<string, Array<string>>(
    [
      ['Electronics', ["Laptop", "Internet Dongle", "Big Monitor"]],
      ['Non-Electronics', ["Laptop Bag", "Notebook"],]
    ]
  );


  constructor(private fb: FormBuilder, private router: Router, private _dataService: DataService) {
    // TODO: add custom validators so fields are required as per the category selected
    // TODO: add more info about each field in this constructor
    this.form = this.fb.group({
      category: ['', Validators.required],
      subCategory: ['', Validators.required],

      // electronics
      model: this.fb.group({
        name: [''],
        memory: [''],
      }),
      specification: this.fb.group({
        warranty: [''],
        screenSize: [''],
      }),

      // non-electronics
      brandName: [''],
      warranty: [''],
      color: [''],
      size: [''],
      dimensions: [''],

      // common
      quantity: [, Validators.required],
      price: ['', Validators.required],
    });
  }
 



  ngOnInit() { }

  routeToDataTable() {
    this.router.navigate(['/inventories']);
  }
  onSubmit() {
    const newData = [];

    if (this.form.valid) {

      // TODO:OPTIMIZE THIS CODE:

      if(this.form.value.category == 'Electronics'){
        for (let i = 0; i < this.form.value.quantity; i++) {
          newData.push(new ElectronicObject(
            uuidv4(),
            this.form.value.category,
            this.form.value.subCategory,
            {
              name: this.form.value.model.name,
              memory: this.form.value.model.memory
            },
            {
              warranty: this.form.value.specification.warranty,
              screenSize: this.form.value.specification.screenSize
            },
            this.form.value.price,
          ));
        }

        this._dataService.addElectronicItems(newData).subscribe(
          (response) => {
            console.log(response);
            this.form.reset();
            this.routeToDataTable();
          },
          (error) => {
            console.log(error);
  
          }
        );
      }
      else{
        for (let i = 0; i < this.form.value.quantity; i++) {
          newData.push(new NonElectronicObject(
            uuidv4(),
            this.form.value.category,
            this.form.value.subCategory,
            this.form.value.brandName,
            this.form.value.warranty,
            this.form.value.color,
            this.form.value.size,
            this.form.value.dimensions,
            this.form.value.price,
          ));
        }

        this._dataService.addNonElectronicItems(newData).subscribe(
          (response) => {
            console.log(response);
            this.form.reset();
            this.routeToDataTable();
          },
          (error) => {
            console.log(error);
          }
        );
      }
      

      // console.log(this.itemsArray);
      // sessionStorage.setItem('displayArray', JSON.stringify(this.itemsArray));

      // const currentData = this._dataService.getFormData();
      // const updatedData = [...currentData, ...newData];


      // console.log('New data to be added:', newData);

      // this._dataService.updateFormData(newData);

      

      // this.form.reset();
      // this.routeToDataTable();

    }
  }

}

// TODO: how to use model and specification objects here?
class ElectronicObject {
  constructor(
    public id: string = '',
    public category: string = '',
    public subCategory: string = '',
    public model = {
      name: '',
      memory: '',
      // TODO: WHAT IS THIS
    },
    public specification: {
      warranty: '',
      screenSize: ''
    },
    public price: string = '',
    // public assignedTo: string = 'none',
    // public status: string = 'available',
  ) { }

}

class NonElectronicObject {
  constructor(
    public id: string = '',
    public category: string = '',
    public subCategory: string = '',
    public brandName: string = '',    
    public warranty: string = '',
    public color: string = '',
    public size: string = '',
    public dimensions: string = '',
    public price: string = '',
  ) { }

}

