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
  public wineryId;
  public productList = <any>[];


  constructor(
    public coreService: CoreService,
    public verifierService: VerifierService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      let id = params.get("tokenId");
      let wineryId = params.get("wineryId");

      if (id) {
        this.wineryId = wineryId;
        this.fetchProducts(this.wineryId);

        this.coreService.getProductList(this.wineryId).subscribe((data) => {
          let item = data.filter((token) => token.id === id);
          if (item.length > 0) {
            console.log(item, "2dejskf")
            this.item = item[0];
            console.log(this.item)
            return;
          }
        });
        return
      }

      this.router.navigate(["/"]);
    });
  }

  public onDateChange($event) { 
    this.fetchTasks( this.wineryId, $event.year, $event.month, $event.day);
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

  public fetchTasks(wineryId, year, month, date) {
    this.productService
      .getTasks(wineryId,year, month, date)

      .subscribe((data) => {
        this.filterType = date ? "day" : month ? "month" : "year";
        this.loadedTasks = data;
      });
  }
  public fetchProducts(wineryId: any) {
    this.coreService.getProductList(wineryId).subscribe((data) => {
      console.log(data);
      this.productList = data;
    });
  }
}
