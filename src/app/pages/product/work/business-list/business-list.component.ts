import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { VerifierService } from "../../verifier/verifier.service";
import { ProductService } from "../../product.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreService } from "src/app/services/core.service";

@Component({
  selector: "app-business-list",
  templateUrl: "./business-list.component.html",
  styleUrls: ["./business-list.component.scss"],
})
export class BusinessListComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  public loadedExpenses = <any>[];
  public item;
  public tokenId;
  public category_id;
  public categoriesLabels = <any>[];
  public selectedCategory: number = -1;
  public wineryId;
  public productList = <any>[];
  public expenseId;



  constructor(
    public coreService: CoreService,
    public verifierService: VerifierService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchLabels();
    this.route.paramMap.subscribe((params) => {
      let id = params.get("tokenId");
     
      let wineryId = params.get("wineryId");
      
      if (id) {
        this.wineryId = wineryId;
        this.fetchProducts(this.wineryId);
        
        this.coreService.getProductList(this.wineryId).subscribe((data) => {
          let item = data.filter((token) => token.id === id);
          if (item.length > 0) {
            this.item = item[0];
            this.fetchExpenses( this.item.year,this.wineryId, this.selectedCategory)
            return;
          }
        });
        return
      }

      this.router.navigate(["/"]);
    });
  }

  public fetchExpenses(wineryId: any, expenseId: any, selectedCategory: any): void {
    this.productService
      .getExpenses(wineryId, expenseId, selectedCategory)
      .subscribe((data) => {
        this.loadedExpenses = data;
      });
  }

  public fetchLabels() {
    this.productService.getCategoriesLabels().subscribe((data) => {
      this.categoriesLabels = data;
    });
  }

  public fetchProducts(wineryId: any) {
    this.coreService.getProductList(wineryId).subscribe((data) => {
      this.productList = data;
    });
  }
}
