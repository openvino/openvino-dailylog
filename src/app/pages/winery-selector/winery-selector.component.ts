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
  public wineriestList = [];
  public productList = [];
  public searchWinery :string = "";

  constructor(public router: Router, public coreService: CoreService,  private productService: ProductService,

    ) {}

  ngOnInit(): void {
    /*     this.productList = this.coreService.getProductList()
    this.wineriesList = this.productService.getWineries()
     */

    this.wineriestList = [
      {
        id: 1,
        name: "Openvino",
        website: "https://openvino.org/ca/",
        img: "assets/images/winery-01.jpeg",
      },
      {
        id: 2,
        name: "Marlet Wines",
        website: "www.openvino.com",
        img: "assets/images/winery-02.jpeg",
      },
      {
        id: 3,
        name: "Vallformosa",
        website: "www.openvino.com",
        img: "assets/images/winery-03.jpeg",
      },
      {
        id: 4,
        name: "Lorem",
        website: "www.openvino.com",
        img: "assets/images/winery-01.jpeg",
      },
      {
        id: 5,
        name: "Ipsum",
        website: "www.openvino.com",
        img: "assets/images/winery-02.jpeg",
      },
      {
        id: 6,
        name: "Ejsjf",
        website: "www.openvino.com",
        img: "assets/images/winery-03.jpeg",
      },
    ];
    console.log(this.productList)
  }

  onProductClick(product) {
    console.log(product);
    this.router.navigate([`${product.id}`]) 
    console.log(product);

  }
  
  onLogoClick() {
    window.open("https://costaflores.com");
  }

  /* public fetchWineries() {
    this.productService.getWineries().subscribe((data) => {
      this.wineriestList = data;
    });
  } */
}
