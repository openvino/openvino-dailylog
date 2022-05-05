import { Component, OnInit } from "@angular/core";
import { CoreService } from "src/app/services/core.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ProductService } from "../product/product.service";
import { filter } from "rxjs/operators";

@Component({
  selector: "app-selector",
  templateUrl: "./winery-selector.component.html",
  styleUrls: ["./winery-selector.component.scss"],
})
export class WinerySelectorComponent implements OnInit {
  public productList = <any>[];
  public wineriesList = <any>[];
  public comingSoonWineriesList = <any>[];

  public allWineries = <any>[];
  public searchTerm: string;
  public item;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public coreService: CoreService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.comingSoonWineriesList = this.coreService.getComingSoonWineriesList()
    this.wineriesList = this.productService.getWineries();
    this.fetchWineries();
  }

  search(value: string): void {
    this.wineriesList = this.allWineries.filter((val) =>
      val.name.toLowerCase().includes(value.toLowerCase())
    );
  }

  onProductClick(product) {
    this.router.navigate([`${product.id}`]);
  }

  onLogoClick() {
    window.open("https://openvino.org/es/");
  }

  public fetchWineries() {
    this.productService.getWineries().subscribe((data) => {
      this.wineriesList = data;
      this.allWineries = this.wineriesList;
    });
  }
}
