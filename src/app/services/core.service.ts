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
}
