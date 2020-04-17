import { Component, OnInit, HostListener } from '@angular/core';
import { VerifierService } from './verifier.service';
import { TranslateService } from '@ngx-translate/core';

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

  private clickInside = false;

  @HostListener('click')
  clickIn() {
    this.clickInside = true;
  }
  
  @HostListener('document:click')
  clickOut() {
    if (!this.clickInside && this.open) {
      this.verifierService.closeVerifier()
    }
  }

  constructor(
    public verifierService: VerifierService,
    public translate: TranslateService
  ) {}
  
  ngOnInit(): void {
    this.verifierService.getOpenedObservable()
      .subscribe(({open, x, y, date, value, data}) => {
        this.open = open;
        this.xCoord = x;
        this.yCoord = y;

        this.date = date;
        this.value = value;
        this.data = data;
      })
  }

}
