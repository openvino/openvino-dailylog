import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';
import { VerifierService } from './verifier.service';
import { TranslateService } from '@ngx-translate/core';
import { Hash } from '@enchainte/sdk';
import { EnchainteService } from 'src/app/services/enchainte.service';

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
  public hash: Hash;

  public proof: string[];
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
    public translate: TranslateService
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

        if (hash && hash.length > 0) {
          this.hash = hash[Math.floor(Math.random() * (hash.length - 1))];
        } else {
          this.hash = null;
        }

        this.proof = [];
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

  onCopyItem() {
    if (this.proof[0]) {
      const selBox = document.createElement('textarea');
      selBox.style.position = 'fixed';
      selBox.style.left = '0';
      selBox.style.top = '0';
      selBox.style.opacity = '0';
      selBox.value = JSON.stringify(this.proof[0]);
      document.body.appendChild(selBox);
      selBox.focus();
      selBox.select();
      document.execCommand('copy');
      document.body.removeChild(selBox);
    }
  }

  public openLink() {
    if (this.transactionHash) {
      window.open(`https://rinkeby.etherscan.io/tx/${this.transactionHash}`, '_blank');
    }
  }

  getProof() {
    if (this.hash) {
      this.enchainteService.getProof(this.hash)
        .subscribe(res => {
          this.proof = res.proof;
          this.transactionHash = res.txhash;
        }, err => {
          this.proof = null;
          this.transactionHash = null;
        })
    }
  }

  verifyProof() {
    if (this.proof) {
      this.proofLoading = true;
      this.enchainteService.verify(this.proof)
        .then(res => {
          this.proofLoading = false;
          this.proofVerified = res;
        })
        .catch(() => {
          this.proofLoading = false;
          this.proofVerified = false;
        })
    }
  }

}
