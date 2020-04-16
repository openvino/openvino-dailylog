import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor() { }

  getProductList() {
    return [
      {
        id: 'MTB17',
        image: 'assets/images/mtb18.png'
      },
      {
        id: 'MTB18',
        image: 'assets/images/mtb18.png'
      },
      {
        id: 'MTB19',
        image: 'assets/images/mtb18.png'
      },
      {
        id: 'MTB20',
        image: 'assets/images/mtb18.png'
      }
    ]
  }
}
