import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import HeatmapData from './heatmap-chart/heatmap-data.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { HEATMAP_TABS } from './heatmap-chart/heatmap-chart.config';
import { YEARS, MONTHS } from './product.config';
import LinearChartData from './linear-chart/heatmap-data.entity';

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
            temperature: this.generateLinearChartData(response, 'temperature', 'ºC', filterType, new Date(year, month || 0, day || 1)),
            wind: this.generateLinearChartData(response, 'wind_velocity', 'm/s', filterType, new Date(year, month || 0, day || 1)),
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
          units: '%',
          label: null
        })
      })

      let filled = [];
      switch (filterType) {
        case 'year':
          MONTHS.forEach(month => {
            let itemData = [];
            sensorData.forEach((item: HeatmapData) => {
              if (item.date.getMonth() == month) {
                itemData.push(item);
              }
            })

            if (itemData.length === 0) {
              filled.push(new HeatmapData({
                date: new Date(date.getFullYear()),
                data: [
                  null,
                  null,
                  null,
                  null
                ],
                units: '%',
                label: `months.${month}`
              }))
            } else {
              filled.push(new HeatmapData({
                date: itemData[0].date,
                data: this.getHeatmapArrayAverage(itemData),
                units: itemData[0].units,
                label: `months.${month}`
              }))
            }
          })
          break;
        case 'month':
          let daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
          for (let day = 0; day < daysInMonth; ++day) {
            let itemData = [];
            sensorData.forEach((item: HeatmapData) => {
              if (item.date.getDate() == day) {
                itemData.push(item);
              }
            })

            if (itemData.length === 0) {
              filled.push(new HeatmapData({
                date: new Date(date.getFullYear(), date.getMonth()),
                data: [
                  null,
                  null,
                  null,
                  null
                ],
                units: '%',
                label: (day + 1).toString()
              }))
            } else {
              filled.push(new HeatmapData({
                date: itemData[0].date,
                data: this.getHeatmapArrayAverage(itemData),
                units: itemData[0].units,
                label: (day + 1).toString()
              }))
            }
          }
          break;

          case 'day':
            for (let hour = 0; hour < 24; ++hour) {
              let itemData = [];
              sensorData.forEach((item: HeatmapData) => {
                if (item.date.getHours() == hour) {
                  itemData.push(item);
                }
              })

              if (itemData.length === 0) {
                filled.push(new HeatmapData({
                  date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                  data: [
                    null,
                    null,
                    null,
                    null
                  ],
                  units: '%',
                  label: `${hour}:00`
                }))
              } else {
                filled.push(new HeatmapData({
                  date: itemData[0].date,
                  data: this.getHeatmapArrayAverage(itemData),
                  units: itemData[0].units,
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

  public generateLinearChartData(data: any[], param: string, units: string, filterType: string, date: Date) {
    let result = [];

    data.forEach(item => {
      let itemDate = new Date(item.timestamp)
      result.push(new LinearChartData({
        date: itemDate,
        data: item[param],
        units: units,
        label: null
      }))
    })

    let filled: LinearChartData[] = [];
      switch (filterType) {
        case 'year':
          MONTHS.forEach(month => {
            let itemData = [];
            result.forEach((item: LinearChartData) => {
              if (item.date.getMonth() == month) {
                itemData.push(item);
              }
            })

            if (itemData.length === 0) {
              filled.push(new LinearChartData({
                date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                data: null,
                units: units,
                label: `months.${month}`
              }))
            } else {
              filled.push(new LinearChartData({
                date: itemData[0].date,
                data: this.getLinearChartArrayAverage(itemData),
                units: itemData[0].units,
                label: `months.${month}`
              }))
            }
          })
          break;
        case 'month':
          let daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
          for (let day = 0; day < daysInMonth; ++day) {
            let itemData = [];
            result.forEach((item: LinearChartData) => {
              if (item.date.getDate() == day) {
                itemData.push(item);
              }
            })

            if (itemData.length === 0) {
              filled.push(new LinearChartData({
                date: new Date(date.getFullYear(), date.getMonth()),
                data: null,
                units: units,
                label: (day + 1).toString()
              }))
            } else {
              filled.push(new LinearChartData({
                date: itemData[0].date,
                data: this.getLinearChartArrayAverage(itemData),
                units: itemData[0].units,
                label: (day + 1).toString()
              }))
            }
          }
          break;

          case 'day':
            for (let hour = 0; hour < 24; ++hour) {
              let itemData = [];
              result.forEach((item: LinearChartData) => {
                if (item.date.getHours() == hour) {
                  itemData.push(item);
                }
              })

              if (itemData.length === 0) {
                filled.push(new LinearChartData({
                  date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                  data: null,
                  units: units,
                  label: `${hour}:00`
                }))
              } else {
                filled.push(new LinearChartData({
                  date: itemData[0].date,
                  data: this.getLinearChartArrayAverage(itemData),
                  units: itemData[0].units,
                  label: `${hour}:00`
                }))
              }
            }
            break;
      }

    return filled;
  }

  private getHeatmapArrayAverage(array: HeatmapData[]) {
    if (array.length > 1) {
      return [
        array.reduce((a: HeatmapData, b: HeatmapData) => a.data[0] + b.data[0], 0) / array.length,
        array.reduce((a: HeatmapData, b: HeatmapData) => a.data[1] + b.data[1], 0) / array.length,
        array.reduce((a: HeatmapData, b: HeatmapData) => a.data[2] + b.data[2], 0) / array.length,
        array.reduce((a: HeatmapData, b: HeatmapData) => a.data[3] + b.data[3], 0) / array.length
      ]
    } else {
      return [
        array[0].data[0],
        array[0].data[1],
        array[0].data[2],
        array[0].data[3],
      ]
    }
  }

  private getLinearChartArrayAverage(array: LinearChartData[]) {
    let sum = 0;
    array.forEach(item => {
      sum += item.data;
    })

    return sum / array.length;
  }
}
