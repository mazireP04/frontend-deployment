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
      // TODO: what to do if unauthorized? how to stop this overlay
      const overlay = document.getElementById("overlay");
      overlay!.style.display = "flex";

      // TODO: SUBSCRIBE DEPRECATED WHY
      this.dataService.authenticateAdmin(this.loginForm.value.email, this.loginForm.value.password).subscribe( 
        {
          // TODO: THIS WAS RESPONSE INSTEAD OF COMPLETE, CHECK THIS
          complete: () => {
            console.log("Authenticated!");
            sessionStorage.setItem('authenticated', this.loginForm.value.email);
            this.loginForm.reset();
            this.router.navigate(['/inventories']);
        },
      error: (err) => {
        // TODO: show message that invalid credentials
        console.error(err.message);
        this.formReset();
        overlay!.style.display = "none";

      }}
      )
      
      // TODO: THIS.EMAIL.VALUE VS THIS.FORM.VALUE.EMAIL 
    } 
    else{
      // TODO: make it a good-looking popup - this will happen when password not string or email doesn't exist?
      // alert('Invalid credentials. Try again');
      this.formReset();
    }
    // this.formReset();
    
  }

  formReset(){
    this.loginForm.reset();
  }

  routeToSignup(){
    this.router.navigate(["/signup"]);
  }
  
}
