import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinerySelectorComponent } from './winery-selector.component';
import { ProductWinerySelectorComponent } from './product-winery-selector/product-winery-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { WinerySelectorRoutingModule } from './winery-selector-routing.module';
import { FormsModule } from '@angular/forms';
import { ProductComingsoonWinerySelectorComponent } from './product-comingsoon-winery-selector/product-comingsoon-winery-selector.component';



@NgModule({
  declarations: [
    WinerySelectorComponent,
    ProductWinerySelectorComponent,
    ProductComingsoonWinerySelectorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    WinerySelectorRoutingModule,
    FormsModule,
  ]
})
export class WinerySelectorModule { }