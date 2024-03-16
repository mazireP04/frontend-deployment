import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-resource-assignmment',
  templateUrl: './resource-assignmment.component.html',
  styleUrl: './resource-assignmment.component.scss'
})
export class ResourceAssignmmentComponent {
  // employees: Employee[] = [];
  // selectedEmployee!: Employee;
  // categories!: string[];
  // subcategories: {[category: string]: string[]} = {};
  // specifications!: string[];
  // availableDevices!: string[];

  form!: FormGroup;

  constructor(private fB: FormBuilder, private router: Router){
    this.form = this.fB.group({
      employee: ['', Validators.required],
      requiredDevice: ['', Validators.required],
      specification: ['', Validators.required],
      available: ['', Validators.required],
    });
  }

  employees: Array<Employee> = [
    {empId: "AB1234", empName: 'Tom', empDepartment: 'HR', empDesignation: 'Manager'},
    {empId: "PQ5678", empName: 'Ben', empDepartment: 'IT', empDesignation: 'Developer'},
    {empId: "XY49583", empName: 'John', empDepartment: 'Finance', empDesignation: 'Accountant'},
  ];


  devices: Array<Device> = [
    {ID: "1234", subcategory: "Laptop", model: "HP", specification: "4GB 15 inches", availablility: "Available"},
    {ID: "4566", subcategory: "Big Monitor", model: "Mac", specification: "8GB 13.5 inches", availablility: "Available"},
    {ID: "4536", subcategory: "Laptop", model: "Dell", specification: "64GB 13 inches", availablility: "Assigned"},
    {ID: "8744", subcategory: "Laptop", model: "HP", specification: "4GB 14 inches", availablility: "Available"},

  ];


  // TODO: HOW TO FILTER OUT ONLY UNIQUE TITLES FOR SHOWING IN OPTIONS:
  subcategories: Array<any> = [
    {key: "Laptop", val: ["HP", "Dell"]},
    {key: "Big Monitor",val:  ["Mac"]},
  ];

  onSubmit(){

    // TODO: BINDING ETC

    this.router.navigate(['/inventories']);
  }


}

class Device{
  ID!: string;
  subcategory!: string;
  model!: string;
  specification!: string;
  availablility!: string;

}


class Employee{
  empId!: string;
  empName!:string;
  empDepartment!: string;
  empDesignation!:string;

  // constructor(id:string , name: string, department: string, designation: string){
  //   this.empId = id;
  //   this.empName = name;
  //   this.empDepartment = department;
  //   this.empDesignation = designation;
  // }

}
























  // inventoryData: any[] = [];
  // availableDevices: any[] = [];

  // resourceAssignmentForm!: FormGroup;

  // constructor(private dataService: DataService){}

  // ngOnInit(): void {
  //     this.resourceAssignmentForm = new FormGroup({
  //       employee: new FormControl('', Validators.required),
  //       category: new FormControl('', Validators.required),
  //       subcategory: new FormControl('', Validators.required),
  //       specification: new FormGroup(
  //         {
  //           memoryDetails: new FormControl('', Validators.required),
  //           screenSize: new FormControl('', Validators.required)
  //         }
  //       ),
  //       availableDevices: new FormControl('', Validators.required)
  //     });

  //     this.dataService.updateInventoryData().subscribe(inventoryData => {
  //       this.inventoryData = inventoryData;
  //       this.updateSelectOptions();
  //     });
  // }

  // updateSelectOptions(){
  // const {category, subCategory } = this.resourceAssignmentForm.requiredDevice;
  // const {memoryDetails, screenSize } = this.resourceAssignmentForm.value.specifcations;

  // this.availableDevices = this.dataService.getFormData().value.filter(device => {
  //   return device.category === category &&
  //   device.subCategory === subCategory &&
  //   device.specificationMemoryDetails === memoryDetails &&
  //   device.specificationScreenSize === screenSize &&
  //   device.status === 'available';
  // });

  // this.resourceAssignmentForm.controls['availableDevices'].setValue(this.availableDevices.map(device => device.id));

  // }

  // onSubmit(){
  //   const selectedEmployee = this.resourceAssignmentForm.value.employee;
  //   const selectedDevices = this.resourceAssignmentForm.value.availableDevices;

  //   selectedDevices.forEach(deviceId => {
  //     const index = this.availableDevices.findIndex(device => device.id === deviceId);
  //     if(index !== -1){
  //       this.availableDevices[index].assignedTo = selectedEmployee;
  //       this.availableDevices[index].status = 'assigned';
  //     }
  //   });

  //   this.dataService.updateResourceAssignment(selectedDevices);
  // }

  // assignREsource(){

  //   const selectedDevice = this.resourceAssignmentForm.get('deviceId')?.value;
  //   const selectedEmployee = this.resourceAssignmentForm.get('employee')?.value;
  //   const itemId = selectedDevice.id;
  //   const employeeId = selectedEmployee.empId; //
  //   const status = 'Assigned';
  //   this.dataService.updateResourceAssignment(itemId, employeeId, status);

  // }

