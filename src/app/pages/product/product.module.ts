import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { ProductComponent } from './product.component';
import { HeatmapComponent } from './heatmap-chart/heatmap-chart.component';
import { ProductService } from './product.service';
import { LinearChartComponent } from './linear-chart/linear-chart.component';
import { TabsComponent } from './tabs/tabs.component';
import { VerifierComponent } from './verifier/verifier.component';
import { VerifierService } from './verifier/verifier.service';
import { TranslateModule } from '@ngx-translate/core';

import '@enchainte/uniswap-component/build/uniswap-enchainte';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    ProductComponent,
    HeatmapComponent,
    LinearChartComponent,
    TabsComponent,
    VerifierComponent
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    TranslateModule
  ],
  providers: [
    ProductService,
    VerifierService
  ]
})
export class ProductModule { }
