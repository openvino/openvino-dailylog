import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TranslateModule } from '@ngx-translate/core';

import { ProofRoutingModule } from './proof-routing.module';
import { ProofComponent } from './proof.component';

@NgModule({
  declarations: [
    ProofComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ProofRoutingModule
  ],
  providers: []
})
export class ProofModule { }
