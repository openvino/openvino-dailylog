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

  public tabs = [];
  public tabActive;
  public apiUrl;

  constructor(
    public coreService: CoreService,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.tabs = TABS;
    this.tabActive = this.tabs[0];

    this.apiUrl = environment.apiUrl;

    this.providerUrl = environment.providerUrl;
    this.fetchDashboardData();
    this.fetchLastUpdated();
    this.fetchRandomCycle();

    this.route.paramMap.subscribe((params) => {
      let id = params.get("id");

      if (id) {
        let products = this.coreService.getProductList();
        let item = products.filter((item) => item.id == id);

        if (item && item[0]) {
          this.item = item[0];
          return;
        }
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

  public fetchData(year, month, date) {
    this.productService.getSensorsData(year, month, date).subscribe((data) => {
      this.filterType = date ? "day" : month ? "month" : "year";
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
    this.fetchData($event.year, $event.month, $event.day);
  }

  public onLogoClick() {
    window.open("https://costaflores.com");
  }

  public back() {
    this.router.navigate(["/"]);
  }

  public onTabChange(event) {
    this.tabActive = event;
  }

  public fetchDashboardData() {
    this.productService.getDashboardSensorData().subscribe((data) => {
      this.dashboardSensorData = data;
    }),
      this.productService.getDashboardAnalysisData().subscribe((data) => {
        this.dashboardAnalysisData = data;
      }),
      this.productService.getDashboardData().subscribe((data) => {
        this.dashboardData = data;
      });
  }
  public fetchRandomCycle() {
    this.randomCycle = this.productService.getRandomCycle();
  }

  public fetchLastUpdated() {
    this.productService.getLastUpdate().subscribe((data) => {
      this.lastUpdatedDate = data;
    });
  }
}
