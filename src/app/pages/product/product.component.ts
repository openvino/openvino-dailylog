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

  public heatmapData = [];
  public linearChartData = [];

  public tabs = [];

  constructor(
    public coreService: CoreService,
    public productService: ProductService
  ) { }

  ngOnInit() {
    this.heatmapData = this.productService.getHeatmapData();
    this.linearChartData = this.productService.getLinearChartData();
    this.tabs = TABS;
  }
}
