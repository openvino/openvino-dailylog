import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CoreService } from 'src/app/services/core.service'
import { ProductService } from './product.service';
import { TABS } from './product.config';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public heatmapData = {};
  public temperatureData = [];
  public windData = [];
  public filterType = 'month';

  public tabs = [];

  constructor(
    public coreService: CoreService,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.tabs = TABS;
  }

  public fetchData(year, month, date) {
    this.productService.getSensorsData(year, month, date)
      .subscribe(data => {
        this.filterType = date ? 'day' : month ? 'month' : 'year';
        this.heatmapData = data.humidity;
        this.temperatureData = data.temperature;
        this.windData = data.wind;
      })
  }

  public onDateChange($event) {
    this.fetchData($event.year, $event.month, null);
  }
}
