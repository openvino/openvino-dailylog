import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectorComponent } from './pages/selector/selector.component';
import { ProductComponent } from './pages/product/product.component';


const routes: Routes = [
  { path: '', component: SelectorComponent },
  { path: ':id', component: ProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
