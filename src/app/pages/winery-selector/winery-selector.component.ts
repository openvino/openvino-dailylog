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
  public productList = <any>[];
  public wineriesList = <any>[];
  public allWineries = <any>[];
  public searchTerm: string;

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

  search(value: string): void {
    this.wineriesList = this.allWineries.filter((val) =>
      val.name.toLowerCase().includes(value)
    );
  }

  onProductClick(product) {
    console.log(product)
    this.router.navigate([`${product.id}`]);
  }

  onLogoClick() {
    window.open("https://openvino.org/es/");
  }

  public fetchWineries() {
    this.productService.getWineries().subscribe((data) => {
      this.wineriesList = data;
      this.allWineries = this.wineriesList
    });
  }
}
