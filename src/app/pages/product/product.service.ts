import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { filter, map, reduce } from "rxjs/operators";
import HeatmapData from "./sensors/heatmap-chart/heatmap-data.entity";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { HEATMAP_TABS } from "./sensors/heatmap-chart/heatmap-chart.config";
import { YEARS, MONTHS } from "./product.config";
import LinearChartData from "./sensors/linear-chart/linear-data.entity";
import { TaskEntity } from "./work/tasks-list/tasks-list.entity";
import { Moment } from "moment";
import { BusinessEntity } from "./work/business-list/business-list.entity";
import { WineriesEntity } from "src/app/pages/winery-selector/winery-selector.entity";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  constructor(public http: HttpClient) {}

  public getSensorsData(
    wineryId: string,
    year: number,
    month?: number,
    day?: number
  ) {
    let filterType = day ? "day" : month ? "month" : "year";

    let params = "?";
    if (wineryId ) params += `winerie_id=${wineryId}`;
    if ( year) params += `&year=${year}`;
    if (month) params += `&month=${month}`;
    if (day) params += `&day=${day}`;

    return this.http.get(`${environment.apiUrl}/sensor_data${params}`).pipe(
      map((response: any[]) => {
        return {
          soilHumidity: this.getHeatmapData(
            response,
            filterType,
            new Date(year, month || 0, day || 1)
          ),
          temperature: this.generateLinearChartData(
            response,
            "temperature",
            "ºC",
            filterType,
            new Date(year, month || 0, day || 1)
          ),
          windSpeed: this.generateLinearChartData(
            response,
            "wind_velocity",
            "knots",
            filterType,
            new Date(year, month || 0, day || 1)
          ),
          humidity: this.generateLinearChartData(
            response,
            "humidity",
            "%",
            filterType,
            new Date(year, month || 0, day || 1)
          ),
          pressure: this.generateLinearChartData(
            response,
            "pressure",
            "",
            filterType,
            new Date(year, month || 0, day || 1)
          ),
          rain: this.generateLinearChartData(
            response,
            "rain",
            "mm",
            filterType,
            new Date(year, month || 0, day || 1)
          ),
          windDirection: this.generateLinearChartData(
            response,
            "wind_direction",
            "º",
            filterType,
            new Date(year, month || 0, day || 1)
          ),
          irradianceUV: this.generateLinearChartData(
            response,
            "irradiance_uv",
            "",
            filterType,
            new Date(year, month || 0, day || 1)
          ),
          irradianceIR: this.generateLinearChartData(
            response,
            "irradiance_ir",
            "",
            filterType,
            new Date(year, month || 0, day || 1)
          ),
          irradianceVI: this.generateLinearChartData(
            response,
            "irradiance_vi",
            "",
            filterType,
            new Date(year, month || 0, day || 1)
          ),
        };
      })
    );
  }

  public getHeatmapData(data: any[], filterType: string, date: Date) {
    let result = {};

    HEATMAP_TABS.forEach((sensor) => {
      let sensorData = data.filter((value) => {
        return value.sensor_id === sensor.id;
      });

      sensorData = sensorData.map((item) => {
        let date = new Date(item.timestamp);
        return new HeatmapData({
          date: date,
          data: [
            (item.humidity005 * 100) / 254,
            (item.humidity05 * 100) / 254,
            (item.humidity1 * 100) / 254,
            (item.humidity2 * 100) / 254,
          ],
          units: "%",
          label: null,
          hash: [item.hash],
        });
      });

      let filled = [];
      switch (filterType) {
        case "year":
          MONTHS.forEach((month) => {
            let itemData: HeatmapData[] = [];
            sensorData.forEach((item: HeatmapData) => {
              if (item.date.getMonth() == month) {
                itemData.push(item);
              }
            });

            if (itemData.length === 0) {
              filled.push(
                new HeatmapData({
                  date: new Date(date.getFullYear()),
                  data: [null, null, null, null],
                  units: "%",
                  label: `months.${month}`,
                  hash: null,
                })
              );
            } else {
              filled.push(
                new HeatmapData({
                  date: itemData[0].date,
                  data: this.getHeatmapArrayAverage(itemData),
                  units: itemData[0].units,
                  label: `months.${month}`,
                  hash: itemData.reduce(
                    (prev, curr) => prev.concat(curr.getHashes()),
                    []
                  ),
                })
              );
            }
          });
          break;
        case "month":
          let daysInMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
          ).getDate();
          for (let day = 1; day <= daysInMonth; ++day) {
            let itemData: HeatmapData[] = [];
            sensorData.forEach((item: HeatmapData) => {
              if (item.date.getDate() == day) {
                itemData.push(item);
              }
            });

            if (itemData.length === 0) {
              filled.push(
                new HeatmapData({
                  date: new Date(date.getFullYear(), date.getMonth(), day),
                  data: [null, null, null, null],
                  units: "%",
                  label: day.toString(),
                  hash: null,
                })
              );
            } else {
              filled.push(
                new HeatmapData({
                  date: itemData[0].date,
                  data: this.getHeatmapArrayAverage(itemData),
                  units: itemData[0].units,
                  label: day.toString(),
                  hash: itemData.reduce(
                    (prev, curr) => prev.concat(curr.getHashes()),
                    []
                  ),
                })
              );
            }
          }
          break;

        case "day":
          for (let hour = 0; hour < 24; ++hour) {
            let itemData: HeatmapData[] = [];
            sensorData.forEach((item: HeatmapData) => {
              if (item.date.getUTCHours() == hour) {
                itemData.push(item);
              }
            });

            if (itemData.length === 0) {
              filled.push(
                new HeatmapData({
                  date: new Date(
                    date.getFullYear(),
                    date.getMonth(),
                    date.getDate()
                  ),
                  data: [null, null, null, null],
                  units: "%",
                  label: `${hour}:00`,
                  hash: null,
                })
              );
            } else {
              filled.push(
                new HeatmapData({
                  date: itemData[0].date,
                  data: this.getHeatmapArrayAverage(itemData),
                  units: itemData[0].units,
                  label: `${hour}:00`,
                  hash: itemData.reduce(
                    (prev, curr) => prev.concat(curr.getHashes()),
                    []
                  ),
                })
              );
            }
          }
          break;
      }

      result[sensor.id] = filled;
    });

    return result;
  }

  public generateLinearChartData(
    data: any[],
    param: string,
    units: string,
    filterType: string,
    date: Date
  ) {
    let result = [];

    data.forEach((item) => {
      let itemDate = new Date(item.timestamp);
      result.push(
        new LinearChartData({
          date: itemDate,
          data: item[param],
          units: units,
          label: null,
          hash: [item.hash],
        })
      );
    });

    let filled: LinearChartData[] = [];
    switch (filterType) {
      case "year":
        MONTHS.forEach((month) => {
          let itemData: LinearChartData[] = [];
          result.forEach((item: LinearChartData) => {
            if (item.date.getMonth() == month) {
              itemData.push(item);
            }
          });

          if (itemData.length === 0) {
            filled.push(
              new LinearChartData({
                date: new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate()
                ),
                data: null,
                units: units,
                label: `months.${month}`,
                hash: null,
              })
            );
          } else {
            filled.push(
              new LinearChartData({
                date: itemData[0].date,
                data: this.getLinearChartArrayAverage(itemData),
                units: itemData[0].units,
                label: `months.${month}`,
                hash: itemData.reduce(
                  (prev, curr) => prev.concat(curr.getHashes()),
                  []
                ),
              })
            );
          }
        });
        break;
      case "month":
        let daysInMonth = new Date(
          date.getFullYear(),
          date.getMonth() + 1,
          0
        ).getDate();
        for (let day = 1; day <= daysInMonth; ++day) {
          let itemData: LinearChartData[] = [];
          result.forEach((item: LinearChartData) => {
            if (item.date.getDate() == day) {
              itemData.push(item);
            }
          });

          if (itemData.length === 0) {
            filled.push(
              new LinearChartData({
                date: new Date(date.getFullYear(), date.getMonth(), day),
                data: null,
                units: units,
                label: day.toString(),
                hash: null,
              })
            );
          } else {
            filled.push(
              new LinearChartData({
                date: itemData[0].date,
                data: this.getLinearChartArrayAverage(itemData),
                units: itemData[0].units,
                label: day.toString(),
                hash: itemData.reduce(
                  (prev, curr) => prev.concat(curr.getHashes()),
                  []
                ),
              })
            );
          }
        }
        break;

      case "day":
        for (let hour = 0; hour < 24; ++hour) {
          let itemData: LinearChartData[] = [];
          result.forEach((item: LinearChartData) => {
            if (item.date.getUTCHours() == hour) {
              itemData.push(item);
            }
          });

          if (itemData.length === 0) {
            filled.push(
              new LinearChartData({
                date: new Date(
                  date.getFullYear(),
                  date.getMonth(),
                  date.getDate()
                ),
                data: null,
                units: units,
                label: `${hour}:00`,
                hash: null,
              })
            );
          } else {
            filled.push(
              new LinearChartData({
                date: itemData[0].date,
                data: this.getLinearChartArrayAverage(itemData),
                units: itemData[0].units,
                label: `${hour}:00`,
                hash: itemData.reduce(
                  (prev, curr) => prev.concat(curr.getHashes()),
                  []
                ),
              })
            );
          }
        }
        break;
    }

    return filled;
  }

  private getHeatmapArrayAverage(array: HeatmapData[]) {
    if (array.length > 1) {
      return [
        array.reduce((a: number, b: HeatmapData) => a + b.data[0], 0) /
          array.length,
        array.reduce((a: number, b: HeatmapData) => a + b.data[1], 0) /
          array.length,
        array.reduce((a: number, b: HeatmapData) => a + b.data[2], 0) /
          array.length,
        array.reduce((a: number, b: HeatmapData) => a + b.data[3], 0) /
          array.length,
      ];
    } else {
      return [
        array[0].data[0],
        array[0].data[1],
        array[0].data[2],
        array[0].data[3],
      ];
    }
  }

  private getLinearChartArrayAverage(array: LinearChartData[]) {
    let sum = 0;
    array.forEach((item) => {
      sum += item.data;
    });

    return sum / array.length;
  }

  public getTasks(
    wineryId: string,
    year: number,
    month?: number,
    day?: number
  ) {
    let params = "?";
    if (year) params += `year=${year}`;
    if (month) params += `&month=${month}`;
    if (day) params += `&day=${day}`;

    return this.http
      .get(`${environment.apiUrl}/tasks?winery_id=${wineryId}${params}`)
      .pipe(
        map((response: any) => {
          return response.map((item) => {
            return new TaskEntity(item);
          });
        }),

        map((response: TaskEntity[]) => {
          let result = {};
          response.forEach((item) => {
            let timestamp =
              Math.floor(item.startDate.getTime() / (1000 * 60 * 60 * 24)) *
              1000 *
              60 *
              60 *
              24;
            result[timestamp] = result[timestamp] || [];
            result[timestamp].push(item);
          });

          return result;
        })
      );
  }

  public getExpenses(
    expenseId: string,
    wineryId: string,
    selectedCategory: number
  ) {
    let params = "?";
    if (expenseId) params += `token_id=${expenseId}`;
    if (wineryId) params += `&winerie_id=${wineryId}`;
    if (selectedCategory && selectedCategory >= 0)
      params += `&category_id=${selectedCategory}`;

    return this.http.get(`${environment.apiUrl}/expenses${params}`).pipe(
      map((response: any) => {
        let expensesResponse = Object.keys(response);
        for (let i = 0; i < expensesResponse.length; i++) {
          let key = expensesResponse[i];
        }
        return new BusinessEntity(response);
      })
    );
  }

  public getDashboardData(wineryId: string) {
    return this.http
      .get(`${environment.apiUrl}/dashboard?winerie_id=${wineryId}`)
      .pipe(
        map((response: any) => {
          return response;
        })
      );
  }

  public getDashboardSensorData(wineryId: string) {
    return this.http
      .get(`${environment.apiUrl}/dashboard?winerie_id=${wineryId}`)
      .pipe(
        map((response: any) => {
          let sensorResult = response.sensor.reduce(
            (acc, curr) => {
              return {
                humidity: acc.humidity + curr.humidity,
                temperature: acc.temperature + curr.temperature,
                viIrradiance: acc.viIrradiance + curr.irradiance_vi,
                irIrradiance: acc.irIrradiance + curr.irradiance_ir,
                uvIrradiance: acc.uvIrradiance + curr.irradiance_uv,
                rain: acc.rain + curr.rain,
                windVelocity: acc.windVelocity + curr.wind_velocity,
                windDirection: acc.windDirection + curr.wind_direction,
                pressure: acc.pressure + curr.pressure,
              };
            },
            {
              humidity: 0,
              temperature: 0,
              viIrradiance: 0,
              irIrradiance: 0,
              uvIrradiance: 0,
              rain: 0,
              windVelocity: 0,
              windDirection: 0,
              pressure: 0,
            }
          );

          return [
            (sensorResult.humidity /= response.sensor.length).toFixed(2),
            (sensorResult.temperature /= response.sensor.length).toFixed(2),
            (sensorResult.viIrradiance /= response.sensor.length).toFixed(2),
            (sensorResult.irIrradiance /= response.sensor.length).toFixed(2),
            (sensorResult.uvIrradiance /= response.sensor.length).toFixed(2),
            (sensorResult.rain /= response.sensor.length).toFixed(2),
            (sensorResult.windVelocity /= response.sensor.length).toFixed(2),
            (sensorResult.windDirection /= response.sensor.length).toFixed(2),
            (sensorResult.pressure /= response.sensor.length).toFixed(2),
          ];
        })
      );
  }

  public getDashboardAnalysisData(wineryId: string) {
    return this.http
      .get(`${environment.apiUrl}/dashboard?winerie_id=${wineryId}`)
      .pipe(
        map((response: any) => {
          let analysisResult = response.analysis.reduce((acc, curr) => {
            return {
              co: acc.co + curr.co,
              s: acc.s + curr.s,
              guano: acc.guano + curr.guano,
              h2o: acc.h2o + curr.h2o,
            };
          });

          return [
            (analysisResult.co =
              analysisResult.co / response.analysis.length).toFixed(2),
            (analysisResult.s =
              analysisResult.s / response.analysis.length).toFixed(2),
            (analysisResult.guano =
              analysisResult.guano / response.analysis.length).toFixed(2),
            (analysisResult.h2o =
              analysisResult.h2o / response.analysis.length).toFixed(2),
          ];
        })
      );
  }

  public getLastUpdate(wineryId: string) {
    return this.http
      .get(`${environment.apiUrl}/dashboard?winerie_id=${wineryId}`)
      .pipe(
        map((response: any) => {
          const updates = response.sensor.sort((a, b) => {
            return a.timestamp - b.timestamp;
          });
          return updates[0].timestamp;
        })
      );
  }

  public getRandomCycle() {
    const growingCycles = [
      "Bud burst",
      "Flowering",
      "Setting",
      "Thinning and ulling",
      "Veraison",
      "Harvest",
      "Pruning",
    ];

    const randomCycle = Math.floor(Math.random() * growingCycles.length);
    const randomCycleString = growingCycles[randomCycle];
    return randomCycleString;
  }

  public getCategoriesLabels() {
    return this.http.get(`${environment.apiUrl}/language/es`).pipe(
      map((response: any) => {
        let categoriesLabels = response.expenses.categories;
        return categoriesLabels;
      })
    );
  }

  public getWineries() {
    return this.http.get(`${environment.apiUrl}/wineries`).pipe(
      map((response: any) => {
        return response.map((item) => {
          return new WineriesEntity(item);
        });
      })
    );
  }

  public getTokensByWinery(wineryId: string) {
    let params = "?";
    if (wineryId) params += `winerie_id=${wineryId}`;
    return this.http.get(`${environment.apiUrl}/token${params}`).pipe(
      map((response: any) => {
        return response.map((item) => {
          return new WineriesEntity(item);
        });
      })
    );
  }
}
