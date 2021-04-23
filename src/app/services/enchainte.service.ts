import { Injectable } from '@angular/core';
import { EnchainteClient, Message } from '@enchainte/sdk';
import { from } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Proof } from '@enchainte/sdk/dist/types/proof/entity/proof.entity';

@Injectable({
  providedIn: 'root'
})
export class EnchainteService {

  private sdk: EnchainteClient;

  constructor(
    public http: HttpClient
  ) {
    this.sdk = new EnchainteClient(environment.apiKey);
  }

  public getProof(hash: Message[], date: Date, day = false) {
    if (hash && hash.length > 0) {
      let firstHash = hash[0]
      return from(this.sdk.getProof(hash))
        .pipe(
          flatMap(proof => {
            return from(this.sdk.getMessages([firstHash]))
            .pipe(
              map(messages => { 
                return {
                messages,
                proof
              }
              })
            )
             
          }), flatMap(res=> {
            return from(this.sdk.getAnchor(res.messages[0].anchor))
            .pipe(
              map(anchor => {
                if (res.messages && res.messages[0]) {
                  return {
                    proof: res.proof,
                    root:anchor.root,
                    txHash: anchor.networks.filter(network => network.name=="ethereum_rinkeby"
                    )[0].txHash
                  }
                }
              })
            )
          })
        );
    } else {
      let dateQuery = day ? `&day=${date.getDate()}` : ''
      return this.http.get(`${environment.apiUrl}/sensor_data/hashes?year=${date.getFullYear()}&month=${date.getMonth() + 1}${dateQuery}`)
        .pipe(
          map((hashes: any[]) => {
            return hashes.map(hash => {
              return Message.fromHash(hash)
            })
          }),
          flatMap(hashes => {
            return this.getProof(hashes, date)
          })
        )
    }
  }

  public verify(proof: Proof) {
    return this.sdk.verifyProof(proof)
  }
}
