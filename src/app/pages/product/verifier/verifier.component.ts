import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { VerifierService } from './verifier.service';
import { TranslateService } from '@ngx-translate/core';
import { Hash } from '@enchainte/sdk';
import { EnchainteService } from 'src/app/services/enchainte.service';
import Proof from '@enchainte/sdk/dist/types/verify/proof';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verifier',
  templateUrl: './verifier.component.html',
  styleUrls: ['./verifier.component.scss']
})
export class VerifierComponent implements OnInit {

  public open = false;
  public xCoord = null;
  public yCoord = null;

  public date: Date;
  public value: string;
  public data = null;
  public hashes: Hash[];

  public proof: Proof;
  public proofVerified: boolean;
  public proofLoading: boolean;

  public transactionHash: string;

  private clickInside = false;

  @ViewChild('verifier') verifier: ElementRef;

  @HostListener('click')
  clickIn() {
    this.clickInside = true;
  }
  
  @HostListener('document:click')
  clickOut() {
    if (!this.clickInside && this.open) {
      this.verifierService.closeVerifier()
    } else {
      this.clickInside = false;
    }
  }

  constructor(
    public verifierService: VerifierService,
    public enchainteService: EnchainteService,
    public translate: TranslateService,
    public router: Router
  ) {}
  
  ngOnInit(): void {
    this.verifierService.getOpenedObservable()
      .subscribe(({open, x, y, date, value, data, hash}) => {
        this.open = open;

        this.xCoord = -500;
        this.yCoord = -500;

        this.date = date;
        this.value = value;
        this.data = data;

        this.hashes = hash;

        this.proof = null;
        this.proofVerified = null;
        this.proofLoading = false;

        this.getProof();

        setTimeout(() => {
          if (this.verifier) {
            this.yCoord = y;

            if ((window.innerWidth - (x + this.verifier.nativeElement.offsetWidth)) > 0) {
              this.xCoord = x;
            } else {
              this.xCoord = x - this.verifier.nativeElement.offsetWidth;
            }
          }
        }, 300);
      })
  }

  public openLink() {
    this.router.navigate(['/proof'], { queryParams: { hash: this.hashes, date: this.date.toISOString() } })
  }

  getProof() {
    if (this.hashes) {
      this.enchainteService.getProof(this.hashes, this.date)
        .subscribe(res => {
          this.proof = res.proof;
          this.transactionHash = res.txHash;
        }, err => {
          this.proof = null;
          this.transactionHash = null;
          this.proofVerified = false;
        })
    }
  }

  verifyProof() {
    if (this.proof) {
      this.proofLoading = true;
      setTimeout(() => {
        try {
          this.proofVerified = this.enchainteService.verify(this.proof)
        } catch (err) {
          console.error(err)
          this.proofVerified = false
        }
        this.proofLoading = false;
      }, 100)
    }
  }

}
