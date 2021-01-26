import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor() { }

  getProductList() {
    return [
      {
        id: 'MTB18',
        image: 'assets/images/mtb18/image.png',
        bottleImage: 'assets/images/mtb18/bottle.png',
        tokenIcon: 'assets/images/mtb18/token.svg',
        crowdsaleAddress: '0xbbebebc3d30295aff5b4a977e7ff50d34cbe0b39',
        tokenAddress: '0x1bcfd19f541eb62c8cfebe53fe72bf2afc35a255',
        redeemDate: "product.redeem.18",
        year: 2018,
        open: true
      },
      {
        id: 'MTB19',
        image: 'assets/images/mtb19/image.png',
        bottleImage: 'assets/images/mtb19/bottle.png',
        tokenIcon: 'assets/images/mtb19/token.svg',
        crowdsaleAddress: '0x5e147daE49916b714A3639D2f5bdf1e989D4802B',
        tokenAddress: '0x87ab739464881af0011052d4ca0b0d657e8c3b48',
        redeemDate: "product.redeem.19",
        year: 2019,
        open: true
      },
      {
        id: 'MTB20',
        image: 'assets/images/mtb20/image.png',
        bottleImage: 'assets/images/mtb20/bottle.png',
        tokenIcon: 'assets/images/mtb20/token.svg',
        crowdsaleAddress: '0x5411bffa359fF9cEbA0ED275aC5F00aB3435cB47',
        tokenAddress: '0x6a2f414e1298264ecd446d6bb9da012760336a4f',
        redeemDate: "product.redeem.20",
        year: 2020,
        open: true
      },
      {
        id: 'MTB21',
        image: 'assets/images/mtb20/image.png',
        bottleImage: 'assets/images/mtb20/bottle.png',
        tokenIcon: 'assets/images/mtb20/token.svg',
        // crowdsaleAddress: '0x5411bffa359fF9cEbA0ED275aC5F00aB3435cB47',
        // tokenAddress: '0x6a2f414e1298264ecd446d6bb9da012760336a4f',
        // redeemDate: "product.redeem.20",
        year: 2021,
        open: false
      }
    ]
  }
}
