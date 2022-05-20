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
  public winery = <any>[];
  public tokenId;
  public wineriesList = <any>[];

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
        this.fetchWineries();
        this.productService.getWineries().subscribe((data) => {
          let currentWinery = data.filter(
            (winery) => winery.id == this.wineryId
          );
          if (currentWinery.length > 0) {
            this.winery = currentWinery[0];
            return;
          }
        });

        return;
      }

      this.router.navigate(["/"]);
    });
  }

  onProductClick(product) {
    this.router.navigate([`${this.wineryId}/${product.id}`]);
  }

  onLogoClick() {
    window.open(this.winery.website);
  }

  onKnowMoreClick() {
    window.open(this.winery.website);
  }

  public fetchProducts(wineryId: any) {
    this.coreService.getProductList(wineryId).subscribe((data) => {
      this.productList = data;
    });
  }

  public fetchWineries() {
    this.productService.getWineries().subscribe((data) => {
      this.wineriesList = data;
    });
  }
}
