import { Component, OnInit, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';

import { HEATMAP_TABS, HEATMAP_ZONES } from './heatmap-chart.config';
import { VerifierService } from '../verifier/verifier.service';
import HeatmapData from './heatmap-data.entity';

@Component({
  selector: 'app-heatmap-chart',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.scss']
})
export class HeatmapComponent {
  @Input() public data: HeatmapData[] = [];

  public tabs = HEATMAP_TABS;
  public activeTab = null;

  public zones = HEATMAP_ZONES;

  public activeDay = null;
  public activeZone = null;

  constructor(
    public verifierService: VerifierService
  ) {
    this.activeTab = this.tabs[0].id
  }

  ngOnInit() {
    console.log(this.data)
  }

  getValueForDayAndZone(day, zone) {
    return this.data[day].data[zone];
  }

  getDayCount() {
    return Array.from(Array(this.data.length).keys())
  }

  public isActive(day, zone) {
    return day === this.activeDay && zone === this.activeZone;
  }

  public getColor(value) {
    let color1 = [ 2, 179, 190 ];
    let color2 = [ 213, 132, 27 ];
    let valuePercent = value / 254;

    if (value < 0) valuePercent = 0;
    if (value > 254) valuePercent = 1;

    var w1 = valuePercent;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];

    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  }

  public getColorBck(value) {
    if (value > 238) {
      return '#f073f7'
    } else if (value > 222) {
      return '#b511bf'
    } else if (value > 206) {
      return '#8b00b3'
    } else if (value > 190) {
      return '#eb2935'
    } else if (value > 174) {
      return '#ab131c'
    } else if (value > 158) {
      return '#ff862b'
    } else if (value > 143) {
      return '#edac02'
    } else if (value > 127) {
      return '#efc818'
    } else if (value > 111) {
      return '#fade5f'
    } else if (value > 95) {
      return '#8fd903'
    } else if (value > 79) {
      return '#00b23c'
    } else if (value > 63) {
      return '#03812d'
    } else if (value > 47) {
      return '#53cbff'
    } else if (value > 31) {
      return '#0ba9de'
    } else if (value > 15) {
      return '#2d6bcb'
    } else {
      return '#053f9c';
    }
  }

  public onDataClick($event, day, zone) {
    this.activeDay = day;
    this.activeZone = zone;

    this.verifierService.openVerifier($event.pageX, $event.pageY, this.data[day].date, `${this.data[day].data[zone]} ${this.data[day].units}` , {});
    $event.stopPropagation();
  }
}
