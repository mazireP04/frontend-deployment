import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {


  title = "Inventory Management System";
   
  hide = true;

  correctEmail: string = "mail@mail.com";
  correctPassword: string = "Password#1234";

  loginForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;

  constructor(private router: Router){}

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();
  }

  createFormControls(){
    this.email = new FormControl('', [
      Validators.required,
      Validators.email
    ]);

    this.password = new FormControl('', [
      Validators.required,
      // TODO: STRENGTH VALIDATION 
      Validators.minLength(8)
    ])
  }

  getEmailError(){
    if(this.email.hasError("required")){
      return "Email is required.";
    }
    return this.email.hasError('email') ? "Not a valid email" : "";

  }

  getPasswordError(){
    if(this.password.hasError("required")){
      return "Password is required.";
    }
    // return this.password.hasError('minLength') ? "Password should be atleast 8 characters" : "";

    else {return "Password should be atleast 8 characters";}
  }

  createForm(){
    this.loginForm = new FormGroup({
       email: this.email,
       password: this.password
      });
  }

  onSubmit(){
    if(this.loginForm.valid && this.email.value === this.correctEmail && this.password.value === this.correctPassword)
    {
      // console.log("VALID");
      // console.log(sessionStorage.getItem('authenticated'));
      
      sessionStorage.setItem('authenticated', this.email.value);   
      this.router.navigate(['/inventories']);
    } 
    else{
      // TODO: make it a goodlooking popup
      // alert('Invalid credentials. Try again');
      this.formReset();
    }
    this.formReset();
    
  }

  formReset(){
    this.loginForm.reset();
  }
  
}
