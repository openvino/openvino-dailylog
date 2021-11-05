import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { VerifierService } from "../../verifier/verifier.service";
import { ProductService } from "../../product.service";
import { ignoreElements, map, switchMap } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreService } from "src/app/services/core.service";
import { YEARS } from "../../product.config";
import { Observable } from "rxjs";
import { BusinessEntity } from "./business-list.entity";
import { filter } from "rxjs/operators";

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
  public active;
  public filteredExpenses = <any>[];
  public expense;
  public selectedCategory;

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
   
    let id = params.get("id")

    if (id) {
      let products = this.coreService.getProductList();
      let item = products.filter((item) => item.id == id);

      if (item && item[0]) {
        this.item = item[0];
        console.log(this.item, "item")
        this.fetchExpenses(this.item.year, this.selectedCategory);

        return;
      }
    }

    this.router.navigate(["/"]);
  });
  }

  public fetchExpenses(tokenId: any, selectedCategory: any): void {

    this.productService.getExpenses(tokenId, selectedCategory).subscribe((data) => {
      this.loadedExpenses = data;
      console.log(data, "expenses data");
    
    });
  }

  public fetchLabels() {
    this.productService.getCategoriesLabels().subscribe((data) => {
      this.categoriesLabels = data;
      console.log(this.categoriesLabels);
    });
  }

/*   public onSelectedCategory(selectedCategory: any): void {
    this.productService

      .getExpensesForSelectedCategory(selectedCategory)
      .subscribe((data) => {
        this.filteredExpenses = data;
        console.log(this.filteredExpenses, "filtered expenses");
      });
  } */
}
