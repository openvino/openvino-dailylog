import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { CoreService } from "src/app/services/core.service";
import { ProductService } from "../product.service";
import { TABS } from "../product.config";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-evidences",
  templateUrl: "./evidences.component.html",
  styleUrls: ["./evidences.component.scss"],
})
export class  EvidencesComponent {
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

  
  }



  
}