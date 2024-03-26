import { Component } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  form: FormGroup;
  users: Array<Admin> = [];

  hide = true;

  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['' , [Validators.required, Validators.minLength(8)]]
    });
  }

  ngOnInit() {}

  routeToInventory(){
    this.router.navigate(['/inventories']);
  }

  // TODO: ADD PROPER VALIDATIONS 
  // TODO: ADD AUTH GUARD LIKE LOGIN FORM
  onSubmit() {

    if (this.form.valid) {
      var spinner = document.getElementById("spinner");
      spinner!.style.display = "block";

        const newData = new Admin(
          this.form.value.username,
          this.form.value.email,
          this.form.value.password,
        );
      

        // TODO: PREVENT DOUBLE CLICK ON SUBMIT BUTTON WHILE THIS IS GETTING PROCESSED
        // TODO USE ASYNC AWAIT INSTEAD?
      this.dataService.addAdmin(newData).subscribe(
        (response) => {
          console.log("Admin added successfully: ", response);
          sessionStorage.setItem('authenticated', this.form.value.email);   

          this.form.reset();
          this.routeToInventory();
          
        },
        (error) => {
          console.error("Error adding admin: ", error);
          
        }
      );

      // this.form.reset();
      // this.routeToInventory();

    }
  }

  formReset(){
    this.form.reset();
  }

  getPasswordError(){
    if(this.form.value.password.hasError("required")){
      return "Password is required.";
    }
    // return this.password.hasError('minLength') ? "Password should be at least 8 characters" : "";

    else {return "Password should be at least 8 characters";}
  }

}


class Admin {
  constructor(
    public username: string = '',
    public email: string = '',
    public password: string = ''
  ) {}
}
