import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { flatMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BloockClient, Proof, Record} from '@bloock/sdk';

@Injectable({
  providedIn: 'root'
})
export class EnchainteService {

  private sdk: BloockClient;

  constructor(
    public http: HttpClient
  ) {
    this.sdk = new BloockClient(environment.apiKey);
  }

  public getProof(hash: Record[], date?: Date, day = false): Observable<any> {
    if (hash && hash.length > 0) {
      let firstHash = hash[0]
      return from(this.sdk.getProof(hash))
        .pipe(
          flatMap(proof => {
            return from(this.sdk.getRecords([firstHash]))
              .pipe(
                map(messages => {
                    return {
                     messages,
                     proof
                    }
                })
              )
          }), flatMap(res => {
            return from(this.sdk.getAnchor(res.messages[0].anchor))
            .pipe(
              map(anchor => {
                if (res.messages && res.messages[0]) {
                  return {
                    proof: res.proof,
                    root: anchor.root,
                    txHash: anchor.networks.filter(network => network.name === "ethereum_rinkeby")[0].txHash
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
              return Record.fromHash(hash)
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
