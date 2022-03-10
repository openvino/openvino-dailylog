import { Component, OnInit } from "@angular/core";
import { CoreService } from "src/app/services/core.service";
import { Router } from "@angular/router";
import { ProductService } from "../product/product.service";

@Component({
  selector: "app-selector",
  templateUrl: "./winery-selector.component.html",
  styleUrls: ["./winery-selector.component.scss"],
})
export class WinerySelectorComponent implements OnInit {
  public wineriesList = <any>[];
  public productList = <any>[];
  public searchWinery: string = "";

  constructor(
    public router: Router,
    public coreService: CoreService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.productList = this.coreService.getProductList();
    this.wineriesList = this.productService.getWineries();
    this.fetchWineries();
  }

  onProductClick(product) {
    this.router.navigate([`${product.id}`]);
  }

  onLogoClick() {
    window.open("https://openvino.exchange/");
  }

  public fetchWineries() {
    this.productService.getWineries().subscribe((data) => {
      this.wineriesList = data;
    });
  }
}
