import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CoreService {
  constructor() {}

  getProductList() {
    return [
      {
        id: "MTB18",
        image: "assets/images/mtb18/image.png",
        bottleImage: "assets/images/mtb18/bottle.png",
        tokenIcon: "assets/images/mtb18/token.svg",
        crowdsaleAddress: "0xbbebebc3d30295aff5b4a977e7ff50d34cbe0b39",
        tokenAddress: "0x1bcfd19f541eb62c8cfebe53fe72bf2afc35a255",
        redeemDate: "5/6/2021",
        metrics: {
          grapeCultivation: 18,
          wineProduction: 18,
          packaging: 18,
          logistics: 18,
          administration: 18,
          marketing: 18,
        },
        year: 2018,
        open: true,
      },
      {
        id: "MTB19",
        image: "assets/images/mtb19/image.png",
        bottleImage: "assets/images/mtb19/bottle.png",
        tokenIcon: "assets/images/mtb19/token.svg",
        crowdsaleAddress: "0x5e147daE49916b714A3639D2f5bdf1e989D4802B",
        tokenAddress: "0x87ab739464881af0011052d4ca0b0d657e8c3b48",
        redeemDate: "5/6/2022",
        metrics: {
          grapeCultivation: 19,
          wineProduction: 19,
          packaging: 19,
          logistics: 19,
          administration: 19,
          marketing: 19,
        },
        year: 2019,
        open: true,
      },
      {
        id: "MTB20",
        image: "assets/images/mtb20/image.png",
        bottleImage: "assets/images/mtb20/bottle.png",
        tokenIcon: "assets/images/mtb20/token.svg",
        crowdsaleAddress: "0x5411bffa359fF9cEbA0ED275aC5F00aB3435cB47",
        tokenAddress: "0x6a2f414e1298264ecd446d6bb9da012760336a4f",
        redeemDate: "5/6/2023",
        metrics: {
          grapeCultivation: 20,
          wineProduction: 20,
          packaging: 20,
          logistics: 20,
          administration: 20,
          marketing: 20,
        },
        year: 2020,
        open: true,
      },
      {
        id: "MTB21",
        image: "assets/images/mtb21/image.png",
        bottleImage: "assets/images/mtb21/bottle.png",
        tokenIcon: "assets/images/mtb21/token.svg",
        crowdsaleAddress: "0xF785d2652a95F41e5999aF960237bCcaBd291D3e",
        tokenAddress: "0x69d3Af30c63F5bd916bBcD79b58dBc8BD16D0308",
        redeemDate: "5/6/2024",
        metrics: {
          grapeCultivation: 21,
          wineProduction: 21,
          packaging: 21,
          logistics: 21,
          administration: 21,
          marketing: 21,
        },
        year: 2021,
        open: true,
      },
      {
        id: "MTB22",
        image: "assets/images/mtb22/image.png",
        bottleImage: "assets/images/mtb22/bottle.png",
        tokenIcon: "assets/images/mtb22/token.png",
        metrics: {
          grapeCultivation: 22,
          wineProduction: 22,
          packaging: 22,
          logistics: 22,
          administration: 22,
          marketing: 22,
        },
        year: 2022,
        open: false,
      },
    ];
  }
}
