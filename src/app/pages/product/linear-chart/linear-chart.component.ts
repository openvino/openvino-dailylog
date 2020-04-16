import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss']
})
export class LinearChartComponent implements OnInit {

  @ViewChild('matrix') public canvas: ElementRef<HTMLCanvasElement>;

  @Input() public data = [];

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit(): void {
    let ctx = this.canvas.nativeElement.getContext('2d');

    let gradient = ctx.createLinearGradient(0, 0, 0, 220);
    gradient.addColorStop(0, 'rgba(213, 132, 27, .61)');   
    gradient.addColorStop(1, 'rgba(33, 33, 33, .61)');
    
    new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'First dataset',
          data: this.data,
          backgroundColor: gradient
        }],
        labels: [ ...Array(this.data.length).keys() ]
      },
      global: {
        defaultFont: 'Futura'
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false,
        },
        scales: {
          yAxes: [{
            ticks: {
              fontFamily: 'Futura',
              fontColor: "white",
              fontSize: 12,
              padding: 15,
              autoSkip: true,
              autoSkipPadding: 12,
            }
          }],
          xAxes: [{
            ticks: {
              fontFamily: 'Futura',
              fontColor: "white",
              fontSize: 12,
              padding: 15,
              autoSkip: true,
              autoSkipPadding: 12,
            }
          }]
        }
      }
    });
  }
}
