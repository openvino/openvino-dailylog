import { Component } from "@angular/core";
import { CoreService } from "src/app/services/core.service";
import { ProductService } from "../product.service";
import { environment } from "src/environments/environment";
import { KlerosService } from "../../../services/kleros.service";

@Component({
  selector: "app-evidences",
  templateUrl: "./evidences.component.html",
  styleUrls: ["./evidences.component.scss"],
})
export class EvidencesComponent {
  public eventsList = <any>[];
  public tagsDetails = <any>[];
  public tagsList = <any>[];
  public categoriesLabels = <any>[];
  public selectedCategory: number = -1;

  public items: any[] = [];

  public providerUrl: any;
  public apiUrl: any;

  public loading = true;
  public fileName = "";

  constructor(
    public coreService: CoreService,
    public productService: ProductService,
    private klerosService: KlerosService
  ) {}

  ngOnInit() {
    this.apiUrl = environment.apiUrl;
    this.providerUrl = environment.providerUrl;
    this.eventsList = this.coreService.getEventsList();
    this.tagsDetails = this.coreService.getTagsDetails();
    this.getItems();
  }

  async getItems() {
    this.klerosService.getItemList().then(console.log).catch(console.error);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }
}
