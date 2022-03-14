import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WinerySelectorComponent } from './winery-selector.component';
import { ProductWinerySelectorComponent } from './product-winery-selector/product-winery-selector.component';
import { TranslateModule } from '@ngx-translate/core';
import { WinerySelectorRoutingModule } from './winery-selector-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    WinerySelectorComponent,
    ProductWinerySelectorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    WinerySelectorRoutingModule,
    FormsModule,
  ]
})
export class WinerySelectorModule { }