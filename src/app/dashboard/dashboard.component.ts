import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DataService } from '../data.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{

  // get names of all subcats of each category - 3 diff arrays - show them in options when that category is shown...

  // doughnutData!: any;
  // stackedBarData: any = {available: [], unavailable: []};
  // stackedBarLabels!: any; 

  // categoryLabel!: any;
  // category: string = "Electronics";
  // subcategory = new FormControl();
  // subcategory = "All";
  // subcategory = new FormControl("Laptop");
  // subCatList!: Array<any>;

  // worth!: any;
  // totalCount!: any;
  // percentageAvailable!:any;


  // catList = [
  //   "Electronics",
  //   "Non-Electronics"
  // ];

  doughnutData: any;
  stackedBarData: any = {available: [], unavailable: []};
  stackedBarLabels: any; 
  catList = ["Electronics", "Non-Electronics"];
  subCatList: string[] = [];
  worth: any;
  totalCount: any;
  percentageAvailable: any;

  myForm = new FormGroup({
    // subcategory: this.subcategory
    category: new FormControl('All'),
    subcategory: new FormControl('All')
});

  constructor(private dataService: DataService){}

  ngOnInit(): void {
    this.fetchData('All', 'All');
  }

  fetchData(category: string, subcategory: string): void {
    this.dataService.getStackedBarData(category, subcategory).subscribe((obj) => {
      this.stackedBarLabels = obj.modelNames;
      this.stackedBarData.available = obj.available;
      this.stackedBarData.unavailable = obj.unavailable;
    });

    this.dataService.getDoughnutData(category, subcategory).subscribe((data) => {
      this.doughnutData = [data.available, data.unavailable];
      this.subCatList = data.subcategories;
      this.worth = data.worth[0]?.totalPrice;
      this.totalCount = data.totalCount;
      this.percentageAvailable = data.percentageAvailable;
    });
  }

  onCategoryChange(category: string): void {
    this.myForm.controls['subcategory'].setValue('All');
    this.fetchData(category, 'All');
  }

  onSubcategoryChange(subcategory: string): void {
    const category = this.myForm.controls['category'].value || "All";
    this.fetchData(category, subcategory);
  }

  // ngOnInit(){
  //   // this.doughnutData = ["50", "50"];
  //   // this.getData(this.category, this.subcategory.value);
    
  //   this.dataService.getStackedBarData(this.category, this.subcategory.value).subscribe((obj) => {
  //     this.stackedBarLabels = obj.modelNames;
  //     this.stackedBarData.available = obj.available;
  //     this.stackedBarData.unavailable = obj.unavailable;
  //   });

  //   this.dataService.getDoughnutData(this.category, this.subcategory.value).subscribe((data) => {
  //     this.doughnutData = [data.available, data.unavailable];
  //     this.subCatList = data.subcategories;
  //     this.worth = data.worth[0]?.totalPrice;;
  //     this.totalCount = data.totalCount;
  //     this.percentageAvailable = data.percentageAvailable;
  //   })
  // }

  // // getAllData(){
  // //   this.dataService.getStackedBarInfo().subscribe((obj) => {

  // //     this.stackedBarLabels = obj.modelNames;
  // //     this.stackedBarData.available = obj.available;
  // //     this.stackedBarData.unavailable = obj.unavailable;

  // //     // console.log(this.stackedBarData, this.stackedBarLabels);

  // //   });
  // //   // this.stackedBarLabels = ["HP", "Dell", "Asus"];
  // //   // this.stackedBarData = {'available': [35, 21, 10], 'unavailable': [15, 9, 10] }

  // //   this.dataService.getDoughnutChartData().subscribe((data) => {
  // //     this.doughnutData = [data.available, data.unavailable];
  // //   });
  // // }

  
  // // WHY IS THIS NOT WORKING!?
  // ngOnChanges(){
  //   this.getData(this.category, this.subcategory.value);
  //   console.log(this.subcategory.value);
    
  // }

  // getData(category: string, subCat: any){
  //   this.dataService.getStackedBarData(category, subCat).subscribe((obj) => {
  //     this.stackedBarLabels = obj.modelNames;
  //     this.stackedBarData.available = obj.available;
  //     this.stackedBarData.unavailable = obj.unavailable;
  //   });

  //   this.dataService.getDoughnutData(category, subCat).subscribe((data) => {
  //     this.doughnutData = [data.available, data.unavailable];
  //     this.subCatList = data.subcategories;
  //   })
  // }

  // get doubghnut data

  // get stackedbarinfo
  // get stackbar labels
  // get stackedbar data

// get count where status is available
// get count where status is unavailable

  // get all inventory data
  // for each unique model name where subcat is laptop - make array of names [] -- get names
  // for each name, count where name is that and stuatus is available ; and then for unavailable, add to an array at indexof that model but index the available n unavaliable arrays instead
}
