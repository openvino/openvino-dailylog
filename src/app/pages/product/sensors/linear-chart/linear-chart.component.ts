import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import * as Chart from 'chart.js';
import LinearChartData from './linear-data.entity';
import { TranslateService } from '@ngx-translate/core';
import { VerifierService } from '../../verifier/verifier.service';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  selector: 'app-linear-chart',
  templateUrl: './linear-chart.component.html',
  styleUrls: ['./linear-chart.component.scss']
})
export class LinearChartComponent implements OnInit {

  @ViewChild('matrix') public canvas: ElementRef<HTMLCanvasElement>;

  @Input() public data: LinearChartData[] = [];
  @Input() public min: number;
  @Input() public max: number;

  public chart: Chart;

  constructor(
    public translate: TranslateService,
    public verifierService: VerifierService
  ) { }

  ngOnInit() { }

  ngOnChanges(changes) {
    if (this.chart && changes && changes.data) {
      this.chart.data.datasets[0].data = this.data.map(item => item.data);
      this.chart.data.labels = this.data.map(item => this.translate.instant(item.label));

      this.chart.update();
    }
  }

  ngAfterViewInit(): void {
    let ctx = this.canvas.nativeElement.getContext('2d');

    let gradient = ctx.createLinearGradient(0, 0, 0, 220);
    gradient.addColorStop(0, 'rgba(213, 132, 27, .61)');   
    gradient.addColorStop(1, 'rgba(213, 132, 27, .11)');
    
    this.chart = new Chart(ctx, { 
      type: 'line',
      data: {
        datasets: [{
          label: 'First dataset',
          data: this.data,
          backgroundColor: gradient,
          borderColor: 'rgba(213, 132, 27, .61)',
          borderWidth:2,
          pointBackgroundColor: 'rgb(213, 132, 27)'
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
        tooltips: {
          enabled: false
        },
        scales: {
          yAxes: [{
            ticks: {
              fontFamily: 'Futura',
              fontColor: "#9a999e",
              fontSize: 10,
              padding: 15,
              autoSkip: true,
              autoSkipPadding: 12,
              suggestedMin: this.min,
              suggestedMax: this.max,
            }
          }],
          xAxes: [{
            ticks: {
              fontFamily: 'Futura',
              fontColor: "#9a999e",
              fontSize: 10,
              padding: 15,
              autoSkip: true,
              autoSkipPadding: 12,
            },
            gridLines: {
              display: false
            }
          }]
        },
        onClick: (evt, item) => this.onItemClick(evt, item)
      }
    });
  }

  public onItemClick(evt, item: any[]) {
    if (item && item.length > 0) {
      let selectedItem = this.data[item[0]._index];
      this.verifierService.openVerifier(evt.pageX, evt.pageY, selectedItem.date, this.data.length > 24, `${selectedItem.data} ${selectedItem.units}`, selectedItem.data, selectedItem.hash);
    }
  }
}
