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
      model: this.fb.group({
        name: ['', Validators.required],
        memory: ['', Validators.required],
      }),
      specification: this.fb.group({
        warranty: ['', Validators.required],
        screenSize: ['', Validators.required],
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

      // console.log(this.itemsArray);
      // sessionStorage.setItem('displayArray', JSON.stringify(this.itemsArray));

      // const currentData = this._dataService.getFormData();
      // const updatedData = [...currentData, ...newData];

      
      // console.log('New data to be added:', newData);
      
      // this._dataService.updateFormData(newData);

      this._dataService.addItems(newData);

      this.form.reset();
      this.routeToDataTable();

    }
  }

}

// TODO: how to use model and specification objects here?
class DisplayObject {
  constructor(
    public id: string = '',
    public category: string = '',
    public subCategory: string = '',
    public model = {
      name: '',
      memory:  '',
      // TODO: WHAT IS THIS
    },
    public specification:{
      warranty: '',
      screenSize: ''
    },
    public price: string = '',
    public assignedTo: string = 'none',
    public status: string = 'available',
  ) {}

}


