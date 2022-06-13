import { Component } from "@angular/core";
import { CoreService } from "src/app/services/core.service";
import { ProductService } from "../product.service";
import { environment } from "src/environments/environment";
import { gtcrDecode } from '@kleros/gtcr-encoder';
import { KlerosService } from '../../../services/kleros.service';
import { ApolloService } from "src/app/services/apollo.service";



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
    private klerosService: KlerosService,
    private apolloService:ApolloService
  ) {}

  ngOnInit() {
    this.apiUrl = environment.apiUrl;
    this.providerUrl = environment.providerUrl;
    this.eventsList = this.coreService.getEventsList();
    this.tagsDetails = this.coreService.getTagsDetails();
    this.getDisplayedItems().then(console.log).catch(console.error)
  }

  async getDisplayedItems() {
    let items = await this.apolloService.getTagList();

    let metadata = await this.klerosService.getMetadata();
    const metadataByTime = {
      byBlockNumber: {} as any,
      byTimestamp: {} as any,
      address: metadata[0].address,
    };
    metadata.forEach((file:any) => {
      if (file.error) return;
      metadataByTime.byBlockNumber[file.blockNumber] = file;
      metadataByTime.byTimestamp[file.timestamp] = file;
    });

    console.log(metadata);

    let displayItems = items
    .map((item:any, i:any) => {
      let decodedItem: any;
      const errors = [];
      const { columns } =
        metadataByTime.byTimestamp[
          this.takeLower(
            Object.keys(metadataByTime.byTimestamp),
            (item as any).timestamp
          )
        ].metadata;
        try {
          decodedItem = gtcrDecode({ values: item.data, columns });
          // eslint-disable-next-line no-unused-vars
        } catch (err) {
          errors.push(`Error decoding item ${item.ID}`);
          console.warn(`Error decoding item ${item.ID}: ${err}`);
        }

        // Return the item columns along with its TCR status data.
        return {
          metadata: {},
          tcrData: {
            ...item, // Spread to convert from array to object.
          },
          columns: columns.map(
            (col: any, i: any) => ({
              value: decodedItem && decodedItem[i],
              ...col,
            }),
            { key: i }
          ),
          errors,
        };
      })

      .sort(({ tcrData: tcrDataA }, { tcrData: tcrDataB }) => {
        if (!tcrDataA || !tcrDataB) return 0;
        if (!(tcrDataA as any).resolved && (tcrDataB as any).resolved)
          return -1;
        if ((tcrDataA as any).resolved && !(tcrDataB as any).resolved) return 1;
        return 0;
      });

    let promises = [];
    for (let item of displayItems) {
      promises.push(
        this.klerosService.getMetadataEvidence(item.columns[0].value)
      );
    }

    let metadataEvidence = await Promise.all(promises);
    displayItems = displayItems.map((item:any, i:any) => {
      return {
        ...item,
        metadata: metadataEvidence[i],
      };
    });

    console.log(displayItems);

    this.items = displayItems;


  }

  private takeLower(list: any[], limit: number) {
    list = list.map((item) => Number(item));
    limit = Number(limit);
    let result = list[0];

    for (let i = 0; i < list.length; i++)
      if (list[i] > limit) {
        result = list[i - 1];
        break;
      }

    return result;
  }

    onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
    }
  }

  
}
