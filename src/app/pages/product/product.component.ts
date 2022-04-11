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
  public wineryId = "1";
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
  
    this.route.paramMap.subscribe((params) => {
      let id = params.get("wineryId");
      let tokenId = params.get("tokenId");
      if (id) {
        this.wineryId = id;
        console.log(this.wineryId)
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


  public fetchProducts(wineryId: any) {
    this.coreService.getProductList(wineryId).subscribe((data) => {
      console.log(data);
      this.productList = data;
    });
  }
}
