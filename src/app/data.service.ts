import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
import { api_url } from './api.const';
import * as JSEncrypt from 'jsencrypt';
import { Observable, firstValueFrom } from 'rxjs';
// import * as forge from 'node-forge';


@Injectable({
  providedIn: 'root',
})
export class DataService {
  private inventoryApiUrl = `${api_url}inventoryItems`;
  private usersApiUrl = `${api_url}users`;
  private adminsApiUrl = `${api_url}admins`;
  private adminApiUrl = `${api_url}admin`;

  // encryptor!: JSEncrypt.JSEncrypt;
  constructor(private http: HttpClient) { }

  addItems(newItems: any[]) {
    return this.http.post<any[]>(this.inventoryApiUrl, newItems);
  }

  deleteItem(id: string) {
    return this.http.delete<any[]>(`${this.inventoryApiUrl}/${id}`);
  }

  // getInventoryItems(limit: number, offset: number): Observable<any> {
  //   // return this.http.get<any[]>(this.inventoryApiUrl);
  //   return this.http.get<any[]>(`${this.inventoryApiUrl}?limit=${limit}&offset=${offset}`);
  // }

  getAllItems() {
    return this.http.get<any>(`${this.inventoryApiUrl}/getAll`);
  }

  getInventoryItems(pageIndex: number, pageLength: number): Observable<any> {
    // return this.http.get<any[]>(this.inventoryApiUrl);
    return this.http.get<any[]>(
      `${this.inventoryApiUrl}?pageIndex=${pageIndex}&pageLength=${pageLength}`
    );
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
    return this.http.post<Object>(this.adminApiUrl, admin);
  }

  // getPublicKey(){
  //   return this.http.get<string>(`${this.adminApiUrl}/public-key`);
  // }

  // TODO: noticed 4 vulnerabilities when npm install jsencrypt


  async getPublicKey(): Promise<string> {
    try {
      const publicKeyResponse = await this.http
        .get<{ publicKey: string }>(`${this.adminApiUrl}/public-key`)
        .toPromise();

      if (!publicKeyResponse || typeof publicKeyResponse.publicKey !== 'string') {
        throw new Error('Invalid public key');
      }

      // const publicKey = publicKeyResponse.trim();
      // const publicKey = publicKeyResponse.publicKey;


      // if (typeof publicKey!== 'string') {
      //   throw new Error('Public key is not a string');
      // }

      // this.encryptor = new JSEncrypt.JSEncrypt();
      // this.encryptor.setPublicKey(publicKey);

      return publicKeyResponse.publicKey;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async encryptPassword(password: string) {
    try{
      const publicKey = await this.getPublicKey();
      const encryptor = new JSEncrypt.JSEncrypt();
      encryptor.setPublicKey(publicKey);

      // const publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
      const encryptedPassword = encryptor.encrypt(password);

      return encryptedPassword || "";
    }
    catch(error){
      console.error(error);
      throw error;
      
    }
    // const publicKey = await this.getPublicKey();
    // this.encryptor = new JSEncrypt.JSEncrypt();
    // this.encryptor.setPublicKey(publicKey);
    // const encryptedPassword = this.encryptor.encrypt(password);
    // return encryptedPassword || '';
  }

  authenticateAdmin(email: string, password: string) {
    // check if admin exists..?
    let headers = new HttpHeaders();
    headers= headers.set('content-type', 'application/json');
    return this.http.post<Object>(`${this.adminApiUrl}/login`, {
      email,
      password,
    }, {headers});
  }

  markItemsAsDeleted(itemIds: string[]) {
    // console.log("Request sent!");

    const body = { ids: itemIds };
    return this.http.patch<any>(`${this.inventoryApiUrl}/delete`, body);
  }

  unassign(itemIds: string[]) {
    // console.log("Request sent!");

    const body = { ids: itemIds };
    return this.http.patch<any>(`${this.inventoryApiUrl}/unassign`, body);
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
