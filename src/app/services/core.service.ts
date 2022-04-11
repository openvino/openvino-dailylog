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
}
