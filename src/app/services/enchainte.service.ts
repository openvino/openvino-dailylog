import { Injectable } from '@angular/core';
import { EnchainteClient, Hash } from '@enchainte/sdk';
import { from } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnchainteService {

  private sdk: EnchainteClient;

  constructor(
    public http: HttpClient
  ) {
    this.sdk = new EnchainteClient();
  }

  public getProof(hash: Hash) {
    return from(this.sdk.getProof(hash))
      .pipe(
        flatMap(res => {
          return this.http.get(`${environment.apiUrl}/root/0x${res[0]}`)
            .pipe(
              map(txhashRes => {
                return {
                  proof: res,
                  txhash: txhashRes[0] ? txhashRes[0].tx_hash : null
                }
              })
            )
        })
      );
  }

  public verify(proof: string[]) {
    return this.sdk.verify(proof)
  }
}
