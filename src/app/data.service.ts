import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { api_url } from './api.const';


// aim: provide the inventory data

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private inventoryApiUrl = `${api_url}inventoryItems`;
  private usersApiUrl = `${api_url}users`;
  private adminsApiUrl = `${api_url}admins`;

  constructor(private http: HttpClient){}

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

  // addUser(newData: any[]){
  //   fetch('http://localhost:3000/api/v1/users', {
  //     method: 'POST',
  //     body: JSON.stringify(newData)
  //   })
  //   .then((response) => response.json())
  //   .then((data) => {
  //     console.log("Response from server: ", data);
      
  //   })
  //   .catch((error) => {
  //     console.error("Error: ", error);
      
  //   });
  // }


  // --------------

  addItems(newItems: any[]){
    return this.http.post<any[]>(this.inventoryApiUrl, newItems);
  }

  deleteItem(id: string){
    return this.http.delete<any[]>(`${this.inventoryApiUrl}/${id}`);

  }
  
  // TODO: PATCH? PUT? IS THERE AN UPDATE; also, any[] ???
  // updateItem(id: string){
  //   return this.http.patch<any[]>(`${this.inventoryApiUrl}/${id}`);

  // }


  getInventoryItems(){
    return this.http.get<any[]>(this.inventoryApiUrl);
  }

  updateItem(id: string, assignedTo: string, status: string){
    return this.http.patch<any[]>(`${this.inventoryApiUrl}/${id}`, {assignedTo, status});
  }


  
addUser(newData: Object){
  return this.http.post<Object>(this.usersApiUrl, newData);

}

deleteUser(id: string){
  return this.http.delete<any[]>(`${this.usersApiUrl}/${id}`);

}

getUsers(){
  return this.http.get<any[]>(this.usersApiUrl);
}


addAdmin(admin: Object){
  return this.http.post<Object>(this.adminsApiUrl, admin);
}

// deleteAdmin(){
//   //first get the email's password, if password matches, then send a delete request using email?????

// }

authenticateAdmin(email: string, password: string){
  // check if admin exists
// get admin where username or email matches and  then check if entered password matches the one in db
// authenticate --- all this is component logic..?
// TODO: GET OBJECT? ANY[]? WHAT?
  return this.http.post<Object>(`${this.adminsApiUrl}/login`, {email, password});

}



}



// TODO:
// INPUT FORM TO ADD INVENTORY ITEMS - POST
// DISPLAY TABLE TO DISPLAY INVENTORY ITEMS - GET
// DELETE OPTION IN DISPLAY TABLE TO DELETE SELECTED ITEM - DELETE
// RESOURCE ASSIGNMENT WILL UPDATE EXISTING USER - UPDATE OR PATCH?
// ADD USER FORM, BUTTON IN RESOURCE ASSIGNMENT, WILL ADD A NEW USER TO USER DB - POST 
// DELETE A USER FROM RESOURCE ASSIGNMENT FORM?????????
// SIGNUP FORM WILL CREATE A NEW ADMIN IN ADMIN DB - POST -- PASSWORD ENCRYPTED.
// LOGIN FORM WILL GET DATA FROM ADMIN DB AND CHECK IF CREDENTIALS MATCH - GET 





















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

