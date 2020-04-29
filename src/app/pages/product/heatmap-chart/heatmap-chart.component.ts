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
  @Input() public data: {};
  @Input() public filterType: 'day' | 'month' | 'year';


  public zoneData: HeatmapData[] = [];

  public tabs = HEATMAP_TABS;
  public activeTab = null;

  public zones = HEATMAP_ZONES;

  public activeDay = null;
  public activeZone = null;

  constructor(
    public verifierService: VerifierService
  ) {}

  ngOnInit() {
    this.onZoneChange(this.tabs[0]);
  }

  ngOnChanges(changes) {
    if (changes.data) {
      this.data = changes.data.currentValue || {};
      this.zoneData = changes.data.currentValue[this.activeTab] || [];
    }
  }

  getElementWith() {
    switch (this.filterType) {
      case 'year':
        return 70;
      case 'month':
        return 30;
      case 'day':
        return 30;
    }
  }

  getValueForDayAndZone(day, zone) {
    return this.zoneData[day].data[zone] === null ? '-' : this.zoneData[day].data[zone];
  }

  getDayCount() {
    return Array.from(Array(this.zoneData.length).keys())
  }

  public isActive(day, zone) {
    return day === this.activeDay && zone === this.activeZone;
  }

  public getColor(value) {
    if (value === null || value === '-') return 'transparent';
    
    let color1 = [ 2, 179, 190 ];
    let color2 = [ 213, 132, 27 ];
    let valuePercent = value / 100;

    if (value < 0) valuePercent = 0;
    if (value > 100) valuePercent = 1;

    var w1 = valuePercent;
    var w2 = 1 - w1;
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];

    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  }

  public onDataClick($event, day, zone) {
    if (this.zoneData[day].data[zone] !== null) {
      this.activeDay = day;
      this.activeZone = zone;

      this.verifierService.openVerifier($event.pageX, $event.pageY, this.zoneData[day].date, `${this.zoneData[day].data[zone]} ${this.zoneData[day].units}` , {}, this.zoneData[day].hash);
    }
    $event.stopPropagation();
  }

  public onZoneChange(tab) {
    this.verifierService.closeVerifier();
    this.activeTab = tab.id;
    this.zoneData = this.data[this.activeTab] || [];
  }
}
