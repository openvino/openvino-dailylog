import { Component, OnInit, HostListener, ElementRef, ViewChild, Input } from '@angular/core';
import { VerifierService } from '../verifier.service';
import { TranslateService } from '@ngx-translate/core';
import { Record } from '@bloock/sdk';
import { EnchainteService } from 'src/app/services/enchainte.service';
import { Router } from '@angular/router';
import { Proof } from '@bloock/sdk/dist/types/proof/entity/proof.entity';

@Component({
  selector: 'app-verifier-button',
  templateUrl: './verifier-button.component.html',
  styleUrls: ['./verifier-button.component.scss']
})
export class VerifierButtonComponent implements OnInit {

  @Input() public hashes: Record[];
  @Input() public proof: Proof;

  public proofVerified: boolean;
  public proofLoading: boolean;

  constructor(
    public enchainteService: EnchainteService,
    public translate: TranslateService,
  ) {}
  
  ngOnInit(): void {
    console.log(this.hashes)
    this.proofVerified = null;
    this.proofLoading = false;

    if (!this.proof) {
      this.enchainteService.getProof(this.hashes)
        .subscribe(res => {
          this.proof = res.proof;
        })
    }
  }

  verifyProof() {
    if (this.proof) {
      this.proofLoading = true;
      setTimeout(async () => {
        try {
          this.proofVerified = (await this.enchainteService.verify(this.proof)!=0)
        } catch (err) {
          console.error(err)
          this.proofVerified = false
        }
        this.proofLoading = false;
      }, 100)
    }
  }

}


