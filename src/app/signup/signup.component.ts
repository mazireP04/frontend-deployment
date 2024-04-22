import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  form: FormGroup;
  users: Array<Admin> = [];

  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dataService: DataService
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() { }

  routeToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  // TODO: ADD PROPER VALIDATIONS
  // TODO: ADD AUTH GUARD LIKE LOGIN FORM
  async onSubmit() {
    if (this.form.valid) {
      var spinner = document.getElementById('spinner');
      spinner!.style.display = 'block';

      console.log("Emailid: ", this.form.value.email);
      
      // TODO: if exists then tell exists, otherwise proceed with making the account
      this.dataService.adminExists(this.form.value.email).subscribe({
        next: response => {
          console.log("Sent to server", response);
          
          if(response){
            const { result } = response;
            console.log("Exists: ", result);
            
            if(result){
              const alert_message = document.getElementById("adminExists") as HTMLElement;

              spinner!.style.display = 'none';
              this.formReset(); // why giving all form field red!?
              // this.form.reset();

                alert_message.style.display = 'block';
                setTimeout(() => {
                  alert_message.style.display = 'none'; 
                }, 4000);
            } else{
              this.addAdmin();
            }
          }
        },
        error: (err)=>{
          console.log(err);
          // throw err?
        }        
      });      
    }
  }

  async addAdmin(){
    try {
      const encryptedPassword = await this.dataService.encryptPassword(
        this.form.value.password
      );

      if (typeof encryptedPassword !== 'string') {
        throw new Error('Failed to encrypt password');
      }

      const newData = new Admin(
        this.form.value.username,
        this.form.value.email,
        encryptedPassword
      );

      // TODO: PREVENT DOUBLE CLICK ON SUBMIT BUTTON WHILE THIS IS GETTING PROCESSED
      // TODO USE ASYNC AWAIT INSTEAD?
      this.dataService.addAdmin(newData).subscribe(
        (response) => {
          console.log('Admin added successfully!');
          sessionStorage.setItem('authenticated', this.form.value.email);

          this.form.reset();
          this.routeToDashboard();
        },
        (error) => {
          console.error('Error adding admin: ', error);
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  routeToLoginPage(){
    this.router.navigate(['/login']);
  }

  formReset() {
    this.form.reset();
  }

  getPasswordError() {
    if (this.form.value.password.hasError('required')) {
      return 'Password is required.';
    }
    // return this.password.hasError('minLength') ? "Password should be at least 8 characters" : "";
    else {
      return 'Password should be at least 8 characters';
    }
  }
}

class Admin {
  constructor(
    public username: string = '',
    public email: string = '',
    public password: string = ''
  ) { }
}
