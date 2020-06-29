import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifierService } from '../product/verifier/verifier.service';
import { Hash } from '@enchainte/sdk';
import { EnchainteService } from 'src/app/services/enchainte.service';
import Proof from '@enchainte/sdk/dist/types/verify/proof';

@Component({
  selector: 'app-proof',
  templateUrl: './proof.component.html',
  styleUrls: ['./proof.component.scss']
})
export class ProofComponent implements OnInit {
  public date: Date;
  public proof: Proof;
  public data: string;

  public root: string;
  public transactionHash: string;

  public proofLoading = false;
  public proofVerified = null;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public enchainteService: EnchainteService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        if (params.date) {
          this.date = new Date(params.date)
        } else {
          this.router.navigate(['/'])
        }

        this.enchainteService.getProof(null, this.date, true)
          .subscribe(res => {
            if (res.proof) {
              this.proof = res.proof;

              this.data = res.proof.nodes.reduce((acc, value) => acc += value)
            }
            this.transactionHash = res.txHash;
            this.root = res.root;
          })
      });
  }

  public openLink() {
    if (this.transactionHash) {
      window.open(`https://ropsten.etherscan.io/tx/${this.transactionHash}`, '_blank');
    }
  }

  public onLogoClick() {
    this.router.navigate(['/'])
  }

  public verifyProof() {
    this.proofLoading = true;

    setTimeout(() => {
      this.proofVerified = this.enchainteService.verify(this.proof);
      this.proofLoading = false;
    }, 100)
    
  }

}
