import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CoreService } from 'src/app/services/core.service'
import { ProductService } from './product.service';
import { TABS } from './product.config';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {

  public item;
  public providerUrl: string;

  public heatmapData = {};
  public temperatureData = [];
  public windData = [];
  public filterType = 'month';

  public tabs = [];

  constructor(
    public coreService: CoreService,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.tabs = TABS;

    this.providerUrl = environment.providerUrl;

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      
      if (id) {
        let products = this.coreService.getProductList();
        let item = products.filter(item => item.id == id);
        
        if (item && item[0]) {
          this.item = item[0];
          return;
        }
      }

      this.router.navigate(['/']);
    });
  }

  public fetchData(month, date) {
    this.productService.getSensorsData(this.item.year, month, date)
      .subscribe(data => {
        this.filterType = date ? 'day' : month ? 'month' : 'year';
        this.heatmapData = data.humidity;
        this.temperatureData = data.temperature;
        this.windData = data.wind;
      })
  }

  public onDateChange($event) {
    this.fetchData($event.month, $event.day);
  }

  public onLogoClick() {
    window.open('https://costaflores.com')
  }

  public back() {
    this.router.navigate(['/']);
  }
}
