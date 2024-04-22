import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrl: './doughnut-chart.component.scss'
})
export class DoughnutChartComponent {
  @Input() data!: any;
  chart!: any;

  
  ngOnInit(): void {
    this.createChart();
  }
  
  ngOnChanges(){
    if(this.data){
      if(this.chart){
        this.updateChart();
      }else{
        this.createChart();
      }
    }
    // this.chart.data.datasets.data = this.data;
  }


  createChart(){
  
    this.chart = new Chart("doughnut", {
      type: 'doughnut',

      data: {// values on X-Axis
        labels: ['Available', 'Unavailable'],  // keep this here like this?
	       datasets: [
          {
            label: "Inventory",
            data: this.data, // [60, 70] ;; [no of available, no of non- available]
            backgroundColor: [ '#A3F9B1', 'lightgrey'],
          },
        ]
      },
      options: {
        aspectRatio:2.5
      }
      
    });

  }

  updateChart(){
    this.chart.data.datasets[0].data = this.data;
    this.chart.update();
  }
  
  
}
