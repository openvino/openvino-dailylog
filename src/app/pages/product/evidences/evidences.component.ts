import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CoreService } from "src/app/services/core.service";
import { ProductService } from "../product.service";
import { TABS } from "../product.config";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";

declare var $: any;

@Component({
  selector: "app-evidences",
  templateUrl: "./evidences.component.html",
  styleUrls: ["./evidences.component.scss"],
})
export class EvidencesComponent {
  public eventsList = <any>[];
  public tagsDetails = <any>[];
  public item;
  public providerUrl: string;

  public loading = true;

  public wineryId: string = "";

  public productList = <any>[];

  public apiUrl;

  constructor(
    public coreService: CoreService,
    public productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.apiUrl = environment.apiUrl;
    this.providerUrl = environment.providerUrl;
    this.eventsList = this.coreService.getEventsList();
    this.tagsDetails = this.coreService.getTagsDetails()

    $('[data-toggle="tooltip"]').tooltip();
  }
}
