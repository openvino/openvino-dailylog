import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import HeatmapData from './heatmap-chart/heatmap-data.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HEATMAP_TABS } from './heatmap-chart/heatmap-chart.config';
import { YEARS, MONTHS } from './product.config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    public http: HttpClient
  ) { }
  
  public getSensorsData(year: number, month?: number, day?: number) {
    let filterType = day ? 'day' : month ? 'month' : 'year';

    let params = '?';
    if (year) params += `year=${year}`;
    if (month) params += `&month=${month + 1}`;
    if (day) params += `&day=${day}`;

    return this.http.get(`${environment.apiUrl}/sensor_data${params}`)
      .pipe(
        map((response: any[]) => {
          return {
            humidity: this.getHeatmapData(response, filterType, new Date(year, month || 0, day || 1)),
            temperature: this.generateTemperatureData(response, filterType)
          }
        })
      )
  }

  public getHeatmapData(data: any[], filterType: string, date: Date) {
    let result = {};

    HEATMAP_TABS.forEach(sensor => {
      let sensorData = data.filter(value => {
        return value.sensor_id === sensor.id;
      })

      sensorData = sensorData.map(item => {
        let date = new Date(item.timestamp)
        return new HeatmapData({
          date: date,
          data: [
            item.humidity005,
            item.humidity05,
            item.humidity1,
            item.humidity2
          ],
          units: 'ºC',
          label: null
        })
      })

      let filled = [];
      switch (filterType) {
        case 'year':
          MONTHS.forEach(month => {
            let found = false;
            sensorData.forEach((item: HeatmapData) => {
              if (item.date.getMonth() == month) {
                found = true;
                item.label = `months.${month}`;
                filled.push(item);
              }
            })

            if (!found) {
              filled.push(new HeatmapData({
                date: new Date(date.getFullYear()),
                data: [
                  null,
                  null,
                  null,
                  null
                ],
                units: 'ºC',
                label: `months.${month}`
              }))
            }
          })
          break;
        case 'month':
          let daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
          for (let day = 0; day < daysInMonth; ++day) {
            let found = false;
            sensorData.forEach((item: HeatmapData) => {
              if (item.date.getDate() == day) {
                found = true;
                item.label = (day + 1).toString();
                filled.push(item);
              }
            })

            if (!found) {
              filled.push(new HeatmapData({
                date: new Date(date.getFullYear(), date.getMonth()),
                data: [
                  null,
                  null,
                  null,
                  null
                ],
                units: 'ºC',
                label: (day + 1).toString()
              }))
            }
          }
          break;

          case 'day':
            for (let hour = 0; hour < 24; ++hour) {
              let found = false;
              sensorData.forEach((item: HeatmapData) => {
                if (item.date.getHours() == hour) {
                  found = true;
                  item.label = `${hour}:00`;
                  filled.push(item);
                }
              })
  
              if (!found) {
                filled.push(new HeatmapData({
                  date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                  data: [
                    null,
                    null,
                    null,
                    null
                  ],
                  units: 'ºC',
                  label: `${hour}:00`
                }))
              }
            }
            break;
      }

      result[sensor.id] = filled;
    })

    return result;
  }

  public generateTemperatureData(data: any[], filterType: string) {
    let result = [];

    data.forEach(item => {
      result.push(item.temperature)
    })

    return result;
  }
}
