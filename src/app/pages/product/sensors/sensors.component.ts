import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CoreService } from "src/app/services/core.service";
import { ProductService } from "../product.service";
import { TABS } from "../product.config";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-sensors",
  templateUrl: "./sensors.component.html",
  styleUrls: ["./sensors.component.scss"],
})
export class SensorsComponent {
  public item;
  public providerUrl: string;

  public heatmapData = {};
  public temperatureData = [];
  public windSpeedData = [];
  public windDirectionData = [];
  public humidityData = [];
  public pressureData = [];
  public rainData = [];
  public irradianceUVData = [];
  public irradianceIRData = [];
  public irradianceVIData = [];
  public filterType = "month";
  public dashboardTaskData = <any>[];
  public dashboardAnalysisData = <any>[];
  public dashboardSensorData = <any>[];
  public dashboardData = <any>[];
  public randomCycle: string;
  public lastUpdatedDate = <any>[];
  public loading = true;

  public wineryId: string = "";
  public year;
  public month;
  public day;

  public productList = <any>[];

  public apiUrl;

  constructor(
    public coreService: CoreService,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.apiUrl = environment.apiUrl;

    this.providerUrl = environment.providerUrl;

    this.route.paramMap.subscribe((params) => {
      let id = params.get("tokenId");
      let wineryId = params.get("wineryId");
      this.wineryId = wineryId;
      console.log(wineryId);

      if (id) {
        this.fetchRandomCycle();
        this.fetchLastUpdated();
        this.fetchDashboardData();
        this.fetchData(this.wineryId, this.year, this.month, this.day);
        this.fetchProducts(this.wineryId);

        this.coreService.getProductList(this.wineryId).subscribe((data) => {
          let item = data.filter((token) => token.id === id);
          if (item.length > 0) {
            this.item = item[0];
            return;
          }
        });

        return;
      }

      this.router.navigate(["/"]);
    });
  }

  public isDashboardReady() {
    return (
      this.dashboardAnalysisData &&
      this.dashboardData &&
      this.dashboardTaskData &&
      this.dashboardSensorData
    );
  }

  public fetchData(wineryId: any, year, month, date) {
    this.productService
      .getSensorsData(wineryId, year, month, date)
      .subscribe((data) => {
        console.log(data, "sensor data");
        this.filterType = date ? "day" : month ? "month" : "year";
        this.wineryId = "1";
        this.heatmapData = data.soilHumidity;
        this.temperatureData = data.temperature;
        this.windSpeedData = data.windSpeed;
        this.windDirectionData = data.windDirection;
        this.humidityData = data.humidity;
        this.pressureData = data.pressure;
        this.rainData = data.rain;
        this.irradianceUVData = data.irradianceUV;
        this.irradianceIRData = data.irradianceIR;
        this.irradianceVIData = data.irradianceVI;
      });
  }

  public onDateChange($event) {
    this.fetchData(this.wineryId, $event.year, $event.month, $event.day);
  }

  public onLogoClick() {
    window.open("https://costaflores.com");
  }

  public back() {
    this.router.navigate(["/"]);
  }

  public fetchDashboardData() {
    this.productService
      .getDashboardSensorData(this.wineryId)
      .subscribe((data) => {
        this.dashboardSensorData = data;
      }),
      this.productService
        .getDashboardAnalysisData(this.wineryId)
        .subscribe((data) => {
          console.log(data);
          this.dashboardAnalysisData = data;
        }),
      this.productService.getDashboardData(this.wineryId).subscribe((data) => {
        this.dashboardData = data;
      });
  }
  public fetchRandomCycle() {
    this.randomCycle = this.productService.getRandomCycle();
  }

  public fetchLastUpdated() {
    this.productService.getLastUpdate(this.wineryId).subscribe((data) => {
      this.lastUpdatedDate = data;
    });
  }
  public fetchProducts(wineryId: any) {
    this.coreService.getProductList(wineryId).subscribe((data) => {
      console.log(data);
      this.productList = data;
    });
  }
}
