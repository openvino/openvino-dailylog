import { Component, OnInit } from "@angular/core";
import { CoreService } from "src/app/services/core.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-selector",
  templateUrl: "./winery-selector.component.html",
  styleUrls: ["./winery-selector.component.scss"],
})
export class WinerySelectorComponent implements OnInit {
  public productList = [];

  constructor(public router: Router, public coreService: CoreService) {}

  ngOnInit(): void {
    /*     this.productList = this.coreService.getProductList()
     */

    this.productList = [
      {
        id: "1",
        name: "Openvino",
        website: "https://openvino.org/ca/",
        img: "assets/images/winery-01.jpeg",
      },
      {
        id: "2",
        name: "Marlet Wines",
        website: "www.openvino.com",
        img: "assets/images/winery-02.jpeg",
      },
      {
        id: "3",
        name: "Vallformosa",
        website: "www.openvino.com",
        img: "assets/images/winery-03.jpeg",
      },
      {
        id: "4",
        name: "Openvino",
        website: "www.openvino.com",
        img: "assets/images/winery-01.jpeg",
      },
      {
        id: "5",
        name: "Marlet Wines",
        website: "www.openvino.com",
        img: "assets/images/winery-02.jpeg",
      },
      {
        id: "6",
        name: "Vallformosa",
        website: "www.openvino.com",
        img: "assets/images/winery-03.jpeg",
      },
    ];
    console.log(this.productList)
  }

  onProductClick(product) {
    this.router.navigate([`${product.id}`]) 
    console.log(product);
  }
  
  onLogoClick() {
    window.open("https://costaflores.com");
  }
}
