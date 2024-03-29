import { Component } from "@angular/core";
import { CoreService } from "src/app/services/core.service";
import { ProductService } from "../product.service";
import { environment } from "src/environments/environment";

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

  public providerUrl: string;
  public apiUrl;

  public loading = true;
  public fileName = "";

  constructor(
    public coreService: CoreService,
    public productService: ProductService
  ) {}

  ngOnInit() {
    this.apiUrl = environment.apiUrl;
    this.providerUrl = environment.providerUrl;
    this.eventsList = this.coreService.getEventsList();
    this.tagsDetails = this.coreService.getTagsDetails();
    this.tagsList = this.coreService.getTagsList();
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }
}
