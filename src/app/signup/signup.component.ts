import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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


  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['' , Validators.required]
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
        const newData = new Admin(
          this.form.value.username,
          this.form.value.email,
          this.form.value.password,
        );
      
 
      this.dataService.addAdmin(newData).subscribe(
        (response) => {
          console.log("Admin added successfully: ", response);
          this.form.reset();
          this.routeToInventory();
          
        },
        (error) => {
          console.error("Error adding admin: ", error);
          
        }
      );

      this.form.reset();
      this.routeToInventory();

    }
  }

}


class Admin {
  constructor(
    public username: string = '',
    public email: string = '',
    public password: string = ''
  ) {}
}
