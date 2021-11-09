import { Component, OnInit } from "@angular/core";
import { VerifierService } from "../../verifier/verifier.service";
import { ProductService } from "../../product.service";
import { map } from "rxjs/operators";
import { ActivatedRoute, Router } from "@angular/router";
import { CoreService } from "src/app/services/core.service";

@Component({
  selector: "app-tasks-list",
  templateUrl: "./tasks-list.component.html",
  styleUrls: ["./tasks-list.component.scss"],
})
export class TasksListComponent implements OnInit {
  public loadedTasks = <any>[];
  public filterType = "month";
  public item;
  public loadedTasksKeys = <any>[];
  public taskKeyToDate;

  constructor(
    public coreService: CoreService,
    public verifierService: VerifierService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
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

  public onDateChange($event) { 
    this.fetchTasks($event.year, $event.month, $event.day);
  }

  public getDate(key) {
    return new Date(parseInt(key));
  }

  public sortByDate(a, b) {
    if (a.key < b.key) {
      return 1;
    }
    if (a.key > b.key) {
      return -1;
    }
    return 0;
  }

  public fetchTasks(year, month, date) {
    this.productService
      .getTasks(year, month, date)

      .subscribe((data) => {
        this.filterType = date ? "day" : month ? "month" : "year";
        this.loadedTasks = data;
      });
  }
}
