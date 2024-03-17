import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// aim: provide the inventory data

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // private jsonFile = new BehaviorSubject<any>('data.json');
  private formDataSubject = new BehaviorSubject<any[]>([]);
  formData$ = this.formDataSubject.asObservable();

  updateFormData(newData: any[]){

    const currentData = this.formDataSubject.value;
    const updatedData = [...currentData, ...newData];

  //   console.log('Current data in service:', currentData);
  // console.log('New data to be added:', newData);
  // console.log('Updated data:', updatedData);

    this.formDataSubject.next(updatedData);
    
  }

  getFormData(): any[]{
    return this.formDataSubject.value;
  }

  updateAssignation(dataToReplace: any[]){
    this.formDataSubject.next(dataToReplace);
  }

}

  // updateFormData(newData: any[], isInventoryData: boolean = true){

  //   const currentData = this.formDataSubject.value;
  //   let updatedData!: any[]; 
  //   // [...currentData, ...newData];

  //   console.log('Current data in service:', currentData);
  // console.log('New data to be added:', newData);
  // console.log('Updated data:', updatedData);

  // if(isInventoryData){
  //   updatedData = [...currentData, ...newData];

  // }
  // else{
  //   updatedData = [...currentData];
  //   updatedData['employees'] = [...newData];
  // }
  //   this.formDataSubject.next(updatedData);
  // }

  // getFormData(): any[]{
  //   return this.formDataSubject.value;
  // }

// ==========
  // constructor() { }

  // // this array

  // putData(){
  //   // from the form
  //   // store in this array
  // }

  // getData(){
  //   // to the table
  //   // return the items array
  // }

