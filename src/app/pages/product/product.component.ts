import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CoreService } from 'src/app/services/core.service'
import { ProductService } from './product.service';
import { TABS } from './product.config';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public item: string;
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
  public filterType = 'month';
  public filteredCategory = null

  public tabs = [];
  public tabActive;
  public categoryActive;
  public apiUrl;
  public wineryId ;

  constructor(
    public coreService: CoreService,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.tabs = TABS;
    this.tabActive=this.tabs[0]
    this.apiUrl = environment.apiUrl;
    this.providerUrl = environment.providerUrl;
    
  }

  public fetchData(wineryId, year, month, date) {
    this.productService.getSensorsData(wineryId,year, month, date )
      .subscribe(data => {
        this.filterType = date ? 'day' : month ? 'month' : 'year';
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
      })
  }

  public onDateChange($event) {
    this.fetchData($event.wineryId, $event.year, $event.month, $event.day);
  }

  public onLogoClick() {
    window.open('https://costaflores.com')
  }

  public back() {
    this.router.navigate(['/']);
  }

  public onTabChange(event){
    this.tabActive=event
  }

  public onCategoryChange(event){
    this.categoryActive=event
  }
}
