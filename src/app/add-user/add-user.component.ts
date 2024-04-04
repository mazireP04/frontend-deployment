import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent implements OnInit {

  form: FormGroup;
  users: Array<Employee> = [];


  constructor(private fb: FormBuilder, private router: Router, private dataService: DataService) {
    this.form = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      department: ['', Validators.required],
      designation: ['', Validators.required],
    });
  }

  ngOnInit() { }

  routeToResourceAssignment() {
    this.router.navigate(['/resource-assignment']);
  }

  onSubmit() {

    if (this.form.valid) {
      const newData = new Employee(
        this.form.value.id,
        this.form.value.name,
        this.form.value.department,
        this.form.value.designation,
      );


      this.dataService.addUser(newData).subscribe(
        (response) => {
          console.log(response);
          this.form.reset();
          this.routeToResourceAssignment();
        }
        ,
        (error) => console.error(error)

      );
    }
  }

  formReset() {
    this.form.reset();
  }

}


class Employee {
  constructor(
    public id: string = '',
    public name: string = '',
    public department: string = '',
    public designation: string = ''
  ) { }

}


