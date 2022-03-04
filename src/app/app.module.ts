import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreService } from './services/core.service';
import { SelectorModule } from './pages/selector/selector.module';
import { WinerySelectorModule } from "./pages/winery-selector/winery-selector.module"
import { ProductModule } from './pages/product/product.module';
import { EnchainteService } from './services/enchainte.service';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'https://costaflores.openvino.exchange/language/', '');
}

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    }),
    SelectorModule,
    WinerySelectorModule,
    ProductModule,
  
  ],
  providers: [
    CoreService,
    EnchainteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
