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

  public isCollapsed = -1;
  public items = ['item 1', 'item 2', 'item 3'];
public index= -1;
  public sectionOptions = []

  constructor(
    public coreService: CoreService,
    public productService: ProductService
  ) {}

  ngOnInit() {
    this.apiUrl = environment.apiUrl;
    this.providerUrl = environment.providerUrl;
    this.eventsList = this.coreService.getEventsList();
    this.tagsDetails = this.coreService.getTagsDetails();
    this.tagsList = this.coreService.getTagsList()

    this.tagsList.forEach((item, itemIndex) => { 
      let obj = {}; 
      obj[`${itemIndex}`] = false; 
      this.sectionOptions.push(obj); 
      }); 

    console.log(this.tagsList)
  }

  toggleSectionVisibility(event, options, sectionIndex) {
    options[`${sectionIndex}`] = !options[sectionIndex];
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }
}
