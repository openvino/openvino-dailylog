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

  public hashes: Hash[];
  public date: Date;
  public proof: Proof;

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
        console.log(params);
        if (params.hash) {
          this.hashes = params.hash;
        }
        if (params.date) {
          this.date = new Date(params.date)
        } else {
          this.router.navigate(['/'])
        }

        this.enchainteService.getProof(this.hashes, this.date)
          .subscribe(res => {
            this.proof = res.proof;
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
