import { Injectable } from "@angular/core";
import { filter, map, reduce } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CoreService {
  constructor(public http: HttpClient) {}

  public getProductList(wineryId: string) {
    return this.http
      .get(`${environment.apiUrl}/token?winerie_id=${wineryId}`)
      .pipe(
        map((response: any[]) => {
          return response;
        })
      );
  }

  getComingSoonWineriesList() {
    return [
      {
        ID: "3",
        CreatedAt: "2022-03-25 12:00:56",
        UpdatedAt: "2022-03-25 12:00:56",
        DeletedAt: "2022-03-25 12:00:56",
        name: "Maal",
        website:"https://maalwines.com/",
        image: "",
        primary_color: ""
      },
      {
        ID: "4",
        CreatedAt: "2022-03-25 12:00:56",
        UpdatedAt: "2022-03-25 12:00:56",
        DeletedAt: "2022-03-25 12:00:56",
        name: "Ricardo Santos",
        website:"http://www.ricardosantos.com/",
        image: "",
        primary_color: ""
      },
      {
        ID: "5",
        CreatedAt: "2022-03-25 12:00:56",
        UpdatedAt: "2022-03-25 12:00:56",
        DeletedAt: "2022-03-25 12:00:56",
        name: "Serrera",
        website:"http://www.serrera.com.ar/",
        image: "",
        primary_color: ""
      }
    ]}

    getEventsList() {
      return [
        {
          id: "1",
          title: "Story submitted",
          body: "21/02/2020",
          timestamp: "Submitted Tue, 14 Jul 2020 20:45:08 GMT by 0x34h..9A99"
        },
        {
          id: "2",
          title: "Title issue",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula.  Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula.  Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula.",
          timestamp: "Submitted Tue, 14 Jul 2020 20:45:08 GMT by 0x34h..9A99"
        },
        {
          id: "3",
          title: "Challenge justification",
          body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare. Maecenas placerat facilisis mollis. Duis sagittis ligula in sodales vehicula",
          timestamp: "Submitted Tue, 14 Jul 2020 20:45:08 GMT by 0x34h..9A99"
        },
      ]}

      getTagsDetails() {
        return [
          {
            id: "1",
            tokenId: "MTB19",
            state: "submitted",
            request_type: "Submission",
            bounty: "100000 DAI",
            requester: "xx12344..234ddc",
            ending_date: "In 6 days",
            public_tag: "Wintermute: Wintermute 1",
            contract_address: "ETH: 1234cdsdf..esfsfs23",
            website:"wwww.website.com",
            public_note:"Wintermute's token management"
          }
        ]}
}


