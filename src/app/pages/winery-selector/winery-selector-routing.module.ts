import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WinerySelectorComponent } from './winery-selector.component';


const routes: Routes = [
  {
    path: '',
    component: WinerySelectorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WinerySelectorRoutingModule { }