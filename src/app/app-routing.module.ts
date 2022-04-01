import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductComponent } from "./pages/product/product.component";
import { ProductModule } from "./pages/product/product.module";
import { SelectorComponent } from "./pages/selector/selector.component";
import { SelectorModule } from "./pages/selector/selector.module";
import { WinerySelectorComponent } from "./pages/winery-selector/winery-selector.component";

const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./pages/winery-selector/winery-selector.module").then(
        (m) => m.WinerySelectorModule
      ),
  },
  {
    path: ":wineryId",
    loadChildren: () =>
      import("./pages/selector/selector.module").then((m) => m.SelectorModule),
  },
  {
    path: ":wineryId/:tokenId",
    loadChildren: () =>
      import("./pages/product/product.module").then((m) => m.ProductModule),
  },
  {
    path: "proof",
    loadChildren: () =>
      import("./pages/proof/proof.module").then((m) => m.ProofModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
