import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { DataService } from '../data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent{

  doughnutData!: any;
  stackedBarData: any = {available: [], unavailable: []};
  stackedBarLabels!: any; 


  constructor(private dataService: DataService){}

  ngOnInit(){
    // this.doughnutData = ["50", "50"];

    this.dataService.getStackedBarInfo().subscribe((obj) => {

      this.stackedBarLabels = obj.modelNames;
      this.stackedBarData.available = obj.available;
      this.stackedBarData.unavailable = obj.unavailable;

      // console.log(this.stackedBarData, this.stackedBarLabels);

    });
    // this.stackedBarLabels = ["HP", "Dell", "Asus"];
    // this.stackedBarData = {'available': [35, 21, 10], 'unavailable': [15, 9, 10] }

    this.dataService.getDoughnutChartData().subscribe((data) => {
      this.doughnutData = [data.available, data.unavailable];
    });
  }

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
