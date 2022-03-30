import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { 
    path: '', 
    loadChildren: () => import('./pages/winery-selector/winery-selector.module').then(m => m.WinerySelectorModule)
  },
  { 
    path: ':wineryId', 
    loadChildren: () => import('./pages/selector/selector.module').then(m => m.SelectorModule)
  },
  { 
    path: 'proof',
    loadChildren: () => import('./pages/proof/proof.module').then(m => m.ProofModule)
  },
  { 
    path: ':winerId/:tokenId',
    loadChildren: () => import('./pages/product/product.module').then(m => m.ProductModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
