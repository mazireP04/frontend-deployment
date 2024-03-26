import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
import { api_url } from './api.const';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private inventoryApiUrl = `${api_url}inventoryItems`;
  private usersApiUrl = `${api_url}users`;
  private adminsApiUrl = `${api_url}admins`;

  constructor(private http: HttpClient) {}

  addItems(newItems: any[]) {
    return this.http.post<any[]>(this.inventoryApiUrl, newItems);
  }

  deleteItem(id: string) {
    return this.http.delete<any[]>(`${this.inventoryApiUrl}/${id}`);
  }

  getInventoryItems() {
    return this.http.get<any[]>(this.inventoryApiUrl);
  }

  updateItem(id: string, assignedTo: string, status: string) {
    return this.http.patch<any[]>(`${this.inventoryApiUrl}/${id}`, {
      assignedTo,
      status,
    });
  }

  addUser(newData: Object) {
    return this.http.post<Object>(this.usersApiUrl, newData);
  }

  deleteUser(id: string) {
    return this.http.delete<any[]>(`${this.usersApiUrl}/${id}`);
  }

  getUsers() {
    return this.http.get<any[]>(this.usersApiUrl);
  }

  addAdmin(admin: Object) {
    return this.http.post<Object>(this.adminsApiUrl, admin);
  }

  authenticateAdmin(email: string, password: string) {
    // check if admin exists..?
    return this.http.post<Object>(`${this.adminsApiUrl}/login`, {
      email,
      password,
    });
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

// deleteAdmin(){
//   //first get the email's password, if password matches, then send a delete request using email?????

// }

// old approach:
// private formDataSubject = new BehaviorSubject<any[]>([]);
// formData$ = this.formDataSubject.asObservable();
// --------------
