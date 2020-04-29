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
        crowdsaleAddress: '0xF30Df4D4F82aE6476e0c4F0321965f3048c9916e',
        tokenAddress: '0xF33001572569Eb1bCE6DB6B1f040Ff2F177F40Ab',
        year: 2018
      },
      {
        id: 'MTB19',
        image: 'assets/images/mtb19/image.png',
        bottleImage: 'assets/images/mtb19/bottle.png',
        tokenIcon: 'assets/images/mtb19/token.svg',
        crowdsaleAddress: '0xF30Df4D4F82aE6476e0c4F0321965f3048c9916e',
        tokenAddress: '0xF33001572569Eb1bCE6DB6B1f040Ff2F177F40Ab',
        year: 2019
      },
      {
        id: 'MTB20',
        image: 'assets/images/mtb20/image.png',
        bottleImage: 'assets/images/mtb20/bottle.png',
        tokenIcon: 'assets/images/mtb20/token.svg',
        crowdsaleAddress: '0xF30Df4D4F82aE6476e0c4F0321965f3048c9916e',
        tokenAddress: '0xF33001572569Eb1bCE6DB6B1f040Ff2F177F40Ab',
        year: 2020
      }
    ]
  }
}
