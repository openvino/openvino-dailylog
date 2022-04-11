import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CoreService } from "src/app/services/core.service";
import { ProductService } from "./product.service";
import { TABS } from "./product.config";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { filter, map } from "rxjs/operators";
import { Observable } from "rxjs";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.scss"],
})
export class ProductComponent {
  public item;
  public day;
  public month;
  public year;
  public providerUrl: string;
  public mapsApiKey: string = environment.mapsApiKey;
  public shippingAccount: string = environment.shippingAccount;

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
  public filteredCategory = null;

  public tabs = [];
  public tabActive;
  public categoryActive;
  public apiUrl;
  public wineryId;
  public productList = <any>[];
  public sensorsData = <any>[];

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
    console.log(this.shippingAccount);
    console.log(this.apiUrl);
    console.log(this.mapsApiKey);
    this.route.paramMap.subscribe((params) => {
      let id = params.get("wineryId");
      let tokenId = params.get("tokenId");
      if (id) {
        this.wineryId = id;
        this.fetchProducts(this.wineryId);

        this.coreService.getProductList(this.wineryId).subscribe((data) => {
          let item = data.filter((token) => token.id === tokenId);
          if (item.length > 0) {
            this.item = item[0];
            return;
          }
        });
      }
    });
  }

  public fetchData(wineryId, year, month, date) {
    this.productService
      .getSensorsData(wineryId, year, month, date)
      .subscribe((data) => {
        this.wineryId;
        this.filterType = date ? "day" : month ? "month" : "year";
        this.filteredCategory;
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
    this.fetchData($event.wineryId, $event.year, $event.month, $event.day);
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

  public onCategoryChange(event) {
    this.categoryActive = event;
  }

  public fetchSensorsData(wineryId: any) {
    this.productService.getDashboardSensorData(wineryId).subscribe((data) => {
      this.sensorsData = data;
    });
  }
  public fetchProducts(wineryId: any) {
    this.coreService.getProductList(wineryId).subscribe((data) => {
      console.log(data);
      this.productList = data;
    });
  }
}
