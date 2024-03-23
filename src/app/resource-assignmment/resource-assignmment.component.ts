import { Component, OnInit, model } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resource-assignmment',
  templateUrl: './resource-assignmment.component.html',
  styleUrl: './resource-assignmment.component.scss'
})
export class ResourceAssignmmentComponent implements OnInit {

  form!: FormGroup;

  employees!: Array<any>;

  inventory_data: Array<any> = [];
  
  // TODO: GET EMPLOYEE OPTIONS FROM DB TOO

  requiredDevices = new Map<string, Set<string>>(
    [
      ["Electronics", new Set()],
      ["Non-Electronics", new Set()],
    ]
  );

  // models =  new Set<string>();
  models = new Map<string, Set<string>>();

  specifications = new Map<string, Set<string>>();


  constructor(private fB: FormBuilder, private router: Router, private dataService: DataService){
    this.form = this.fB.group({
      employee: ['', Validators.required],
      requiredDevice: ['', Validators.required],
      requiredModel: ['', Validators.required],
      specification: ['', Validators.required],
      available: ['', Validators.required],
    });
  }

  ngOnInit(){
    this.dataService.getUsers().subscribe(
      (response) => {
        console.log(response);
        
        // TODO: WANT TO MAKE AN EMPLOYEE ARRAY
        this.employees = response;
      },
      (error) => {
        console.error(error);
        
      }
    );

    this.dataService.getInventoryItems().subscribe(
      (response) => {
        console.log(response);

        
        this.inventory_data = response;

      

      this.inventory_data.forEach(obj => {
        const category = obj.category;
        const subCategory = obj.subCategory;
        const modelName = obj.model.name;

        if(!this.requiredDevices.has(category)){
          this.requiredDevices.set(category, new Set<string>());
        }
        this.requiredDevices.get(category)?.add(subCategory);


        if(!this.models.has(subCategory)){
          this.models.set(subCategory, new Set<string>());
        }
        this.models.get(subCategory)?.add(modelName);
        

        // const specsKey = [obj.specificationMemoryDetails, obj.specificationScreenSize];
        if(!this.specifications.has(modelName)){
          this.specifications.set(modelName, new Set());
        }
        this.specifications.get(modelName)?.add(`${obj.model.memory}, ${obj.specification.screenSize}`);
        // HERE

      }
    );

    // this.dataService.formData$.subscribe((data) => {
    //   // is inventory_data even needed?
    //   this.inventory_data = data;

      

    //   this.inventory_data.forEach(obj => {
    //     const category = obj.category;
    //     const subCategory = obj.subCategory;
    //     const modelName = obj.model.name;

    //     if(!this.requiredDevices.has(category)){
    //       this.requiredDevices.set(category, new Set<string>());
    //     }
    //     this.requiredDevices.get(category)?.add(subCategory);


    //     if(!this.models.has(subCategory)){
    //       this.models.set(subCategory, new Set<string>());
    //     }
    //     this.models.get(subCategory)?.add(modelName);
        

    //     // const specsKey = [obj.specificationMemoryDetails, obj.specificationScreenSize];
    //     if(!this.specifications.has(modelName)){
    //       this.specifications.set(modelName, new Set());
    //     }
    //     this.specifications.get(modelName)?.add(`${obj.model.memory}, ${obj.specification.screenSize}`);
    //     // HERE

        

        

    //     // this.models.add(obj.modelName);
    //     // this.specifications.add(`${obj.specificationMemoryDetails}, ${obj.specificationScreenSize}`);
      
        
    //   });
      

    });

    
    console.log(this.requiredDevices);
    console.log(this.models);
    console.log(this.specifications);

  }

  // employees: Array<Employee> = [
  //   {empId: "AB1234", empName: 'Tom', empDepartment: 'HR', empDesignation: 'Manager'},
  //   {empId: "PQ5678", empName: 'Ben', empDepartment: 'IT', empDesignation: 'Developer'},
  //   {empId: "XY4958", empName: 'John', empDepartment: 'Finance', empDesignation: 'Accountant'},
  //   {empId: "RS6729", empName: 'ABC', empDepartment: 'Finance', empDesignation: 'Accountant'},
  //   {empId: "JK0934", empName: 'XYZ', empDepartment: 'IT', empDesignation: 'Developer'},
  // ];



  // TODO: HOW TO FILTER OUT ONLY UNIQUE TITLES FOR SHOWING IN OPTIONS:
  // subcategories: Array<any> = [
  //   {key: "Laptop", val: ["HP", "Dell"]},
  //   {key: "Big Monitor",val:  ["Mac"]},
  // ];

  onSubmit(){

    // TODO: BINDING ETC
    
    if(this.form.valid){

      this.dataService.updateItem(this.form.value.available, this.form.value.employee, "Assigned").subscribe(
        (response) => {console.log(response)},
        (error) => {console.log(error);
        }
        
      );
      // const selectedId = this.form.value.available;
      // const newData = this.inventory_data.map(obj => {
      //   if(obj.id === selectedId){
      //     return {...obj, assignedTo: this.form.value.employee, status: 'Assigned'};
      //   }
      //   return obj;
      // });

      // this.dataService.updateFormData(newData);

      // this.dataService.updateAssignation(newData);

      this.form.reset();
      
    this.router.navigate(['/inventories']);
    }

  }

  formReset(){
    this.form.reset();
  }

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


// class Device{
//   ID!: string;
//   subcategory!: string;
//   model!: string;
//   specification!: string;
//   availablility!: string;

// }




  // devices: Array<Device> = [
  //   {ID: "1234", subcategory: "Laptop", model: "HP", specification: "4GB 15 inches", availablility: "Available"},
  //   {ID: "4566", subcategory: "Big Monitor", model: "Mac", specification: "8GB 13.5 inches", availablility: "Available"},
  //   {ID: "4536", subcategory: "Laptop", model: "Dell", specification: "64GB 13 inches", availablility: "Assigned"},
  //   {ID: "8744", subcategory: "Laptop", model: "HP", specification: "4GB 14 inches", availablility: "Available"},

  // ];

























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

