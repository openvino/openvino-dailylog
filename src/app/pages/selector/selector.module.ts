import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectorComponent } from './selector.component';
import { ProductSelectorComponent } from './product-selector/product-selector.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    SelectorComponent,
    ProductSelectorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule
  ]
})
export class SelectorModule { }
