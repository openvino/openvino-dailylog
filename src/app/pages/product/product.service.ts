import { Injectable } from '@angular/core';
import HeatmapData from './heatmap-chart/heatmap-data.entity';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  public getLinearChartData() {
    let result = this.generateLinearChartData().map((value, index) => {
      return value;
    });

    return result;
  }

  public getHeatmapData() {
    return this.generateHeatmapData();
  }

  private generateLinearChartData(): any[][] {
    let data = [];

    for (let i = 0; i < 31; ++i) {
      let value = Math.floor(Math.random() * 50) + 1;
      data.push(value)
    }

    return data;
  }

  private generateHeatmapData(): any[][] {
    let data = [];

    for (let i = 1; i <= 31; ++i) {
      let first = Math.floor(Math.random() * 250) + 1;
      let second = Math.floor(Math.random() * first) + 1;
      let third = Math.floor(Math.random() * second) + 1;
      let fourth = Math.floor(Math.random() * third) + 1;
      data.push(new HeatmapData({
        year: 2020,
        month: 2,
        day: i,
        data: [
          first,
          second,
          third,
          fourth
        ],
        units: 'ºC'
      }))
    }

    return data;
  }
}
