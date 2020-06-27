import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProofComponent } from './proof.component';


const routes: Routes = [
  {
    path: '',
    component: ProofComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProofRoutingModule { }