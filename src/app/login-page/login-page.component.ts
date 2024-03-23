import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  // TODO: WHILE LOGGING IN, GET THAT USER EMAIL FROM DB, CHECK PASSWORD, AND THEN AUTHENTICATE ACCORDINGLY..

  title = "Inventory Management System";
   
  hide = true;

  correctEmail: string = "mail@mail.com";
  correctPassword: string = "Password#1234";

  loginForm!: FormGroup;
  email!: FormControl;
  password!: FormControl;

  constructor(private router: Router, private dataService: DataService){}

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
    // return this.password.hasError('minLength') ? "Password should be at least 8 characters" : "";

    else {return "Password should be at least 8 characters";}
  }

  createForm(){
    this.loginForm = new FormGroup({
       email: this.email,
       password: this.password
      });
  }

  async onSubmit(){
    if(this.loginForm.valid)
    {
      // console.log("VALID");
      // console.log(sessionStorage.getItem('authenticated'));
      // try{
      //   const admin = this.dataService.getAdmin(this.email.value);
      // if(!admin){
      //   // TODO: SHOW AN ALERT MESSAGE?
      //   console.error("Invalid user!");
      //   this.formReset();
      // }
      // else{
      //   if(admin.)
      // }

      // }catch(error){

      // }

      // TODO: SUBSCRIBE DEPRECATED WHY
      this.dataService.authenticateAdmin(this.loginForm.value.email, this.loginForm.value.password).subscribe( 
        (response: any) => {
            console.log("Authenticated!");
            sessionStorage.setItem('authenticated', this.email.value);
            this.formReset();
            this.router.navigate(['/inventories']);
        },
      (error) => {
        console.error(error.message);
      }
      )
      
      // TODO: HOW TO SET USERNAME IN HEADER IF NOTHING STORED IN STORAGE?
      // sessionStorage.setItem('authenticated', this.email.value);  
      // TODO: THIS.EMAIL.VALUE VS THIS.FORM.VALUE.EMAIL 
      // this.router.navigate(['/inventories']);
    } 
    else{
      // TODO: make it a good-looking popup
      // alert('Invalid credentials. Try again');
      // this.formReset();
    }
    this.formReset();
    
  }

  formReset(){
    this.loginForm.reset();
  }
  
}
