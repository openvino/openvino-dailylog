import { Component } from "@angular/core";
import { CoreService } from "src/app/services/core.service";
import { ProductService } from "../product.service";
import { environment } from "src/environments/environment";
import { KlerosService } from "../../../services/kleros.service";
import moment from "moment";

@Component({
  selector: "app-evidences",
  templateUrl: "./evidences.component.html",
  styleUrls: ["./evidences.component.scss"],
})
export class EvidencesComponent {
  public eventsList: any[] = [];
  public tagsDetails: any[] = [];
  public tagsList: any[] = [];
  public moment: any = moment;
  public selectedStatus: string = "All status";

  public providerUrl: any;
  public apiUrl: any;

  public loading = true;

  public fileName = "";

  public statusLabels: any[] = [
    { name: "All status", id: "1" },
    { name: "Submitted", id: "2" },
    { name: "Registered", id: "3" },
    { name: "Rejected", id: "4" },
  ];

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
    this.getItems(this.selectedStatus);
  }

  async getItems(selectedStatus) {
    let tags = await this.klerosService.getItemList();
    this.loading = false;

    if (this.selectedStatus == "All status") {
      this.tagsList = tags;
    } else {
      this.tagsList = tags.filter((item) => {
        return item.statusLabel === selectedStatus;
      });
    }
  }

  public onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }
  
}
