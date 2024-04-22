import { Component, Input, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrl: './stacked-bar-chart.component.scss'
})
export class StackedBarChartComponent {
  @Input() data!: any;
  @Input() labels!: any;
  chart!: Chart;

  
  ngOnInit(): void {
    // if (this.data && this.data.available && this.data.unavailable && this.labels) {
    //   this.createChart();
    // }
    this.createChart();
    // console.log("Oninit called");
    
  }


  // ngOnChanges(){
  //   if(this.data){
  //     if(this.data.available && this.data.unavailable){
  //       this.chart.data.datasets[0].data = this.data.available;
  //     this.chart.data.datasets[1].data = this.data.unavailable;
  //     this.chart.data.labels = this.labels;

  //     console.log("Stacked chart: \nLabels: ", this.labels, "\nAvail, unavail: ",[this.data.available, this.data.unavailable]);
      
  //     }
  //   } 
  // }

  ngOnChanges() {
    // console.log("Onchanges callled!");

    if(this.data && this.labels){
      if(this.chart){
        this.updateChart();
      }
      else{
        this.createChart();
      }
    }    
    // if (changes['data'] && this.data && this.data.available && this.data.unavailable && this.labels) {
    //   if (this.chart) {
    //     this.updateChart();
    //   } else {
    //     this.createChart();
    //   }
    // }
  }
  
  
  // labels ["unique"]

  // {available: [hp_count, dell_count, asus_count], unavailable: [hp_count, dell_count, asus_count]  }
  // data.available
  // data.unvailable

  updateChart() {
    this.chart.data.labels = this.labels;
    this.chart.data.datasets[0].data = this.data.available.map((item: any) => item.count);
    this.chart.data.datasets[1].data = this.data.unavailable.map((item: any) => item.count);
    this.chart.update();

      // console.log("updating available: ",this.data.available);
      // console.log("updating unavailabe: ",this.data.unavailable);
      // console.log("updating lables: ",this.labels);

      // console.log(this.data.available);

      
  }


  createChart(){
  
    // console.log(this.data);

    // console.log(this.data["available"]);
    
    this.chart = new Chart("stackedBar", {
      type: 'bar', //this denotes the type of chart

      data: {// values on X-Axis
        labels: this.labels , 
	       datasets: [
          {
            label: "Available",
            data: this.data.available,
            backgroundColor: '#A3F9B1',  //'#a1ece0', //'#c493ff', // 'limegreen',
            stack: 'Stack 0'
          },
          {
            label: "Unavailable",
            data: this.data.unavailable,
            backgroundColor: 'lightgrey',
            stack: 'Stack 0'
          }  
        ]
      },
      options: {
        indexAxis: 'y',
        aspectRatio: 2.5
      }
      
    });

  }

  
}
