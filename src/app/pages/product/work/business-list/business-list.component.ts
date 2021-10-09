import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { VerifierService } from "../../verifier/verifier.service";
import { ProductService } from "../../product.service";
import { map } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreService } from "src/app/services/core.service";
import { YEARS } from "../../product.config"


@Component({
  selector: "app-business-list",
  templateUrl: "./business-list.component.html",
  styleUrls: ["./business-list.component.scss"],
})
export class BusinessListComponent implements OnInit {
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();

  public loadedExpenses = <any>[];
  public item;
  public token_id;
  public category_id;
  public categoriesLabels = <any>[]
  public selectedCategory;
  public active;


  constructor(
    public coreService: CoreService,
    public verifierService: VerifierService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.fetchExpenses(2020, 1)
    this.fetchLabels()
    this.selectedCategory;

    if (this.selectedCategory) {
      this.active = this.selectedCategory[0].id;
    }

    this.route.paramMap.subscribe((params) => {
      let id = params.get("id");

      if (id) {
        let products = this.coreService.getProductList();
        let item = products.filter((item) => item.id == id);

        if (item && item[0]) {
          this.item = item[0];
          return;
        }
      }

      this.router.navigate(["/"]);
    });

  }


   public onCategoryChange(category) {
     console.log(category)
      this.active = category;
    }


  public fetchExpenses(token_id, category_id) {
    this.productService
      .getExpenses(token_id, category_id)
      .subscribe((data) => {

        this.loadedExpenses = data;
        console.log(data, "expenses data");
        console.log(this.loadedExpenses, "loaded expenses data");
      });
  }

  public fetchLabels() {
    this.productService
    .getCategoriesLabels()
    .subscribe((data) => {
      this.categoriesLabels = data
      console.log(this.categoriesLabels)
    })

  }
}



