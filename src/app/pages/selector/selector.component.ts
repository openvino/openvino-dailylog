import { Component, OnInit } from "@angular/core";
import { CoreService } from "src/app/services/core.service";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { ProductService } from "../product/product.service";

@Component({
  selector: "app-selector",
  templateUrl: "./selector.component.html",
  styleUrls: ["./selector.component.scss"],
})
export class SelectorComponent implements OnInit {
  public productList = <any>[];
  public wineryId;
  public item;

  constructor(
    public coreService: CoreService,
    public productService: ProductService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get("wineryId");

      if (id) {
        this.wineryId = id;
        this.fetchProducts(this.wineryId);

        return;
      }

      this.router.navigate(["/"]);
    });
  }

  onProductClick(product) {
    this.router.navigate([`/${this.wineryId}/${product.id}`]);
  }

  onLogoClick() {
    window.open("https://costaflores.com");
  }

  onKnowMoreClick() {
    window.open("https://ico.costaflores.com");
  }

  public fetchProducts(wineryId: any) {
    this.coreService.getProductList(wineryId).subscribe((data) => {
      console.log(data, "dvxv");
      this.productList = data;
    });
  }
}
