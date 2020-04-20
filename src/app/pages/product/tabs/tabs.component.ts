import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VerifierService } from '../verifier/verifier.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit {

  @Input() public tabs: {id: string, name: string}[] = [];
  @Output() onChange: EventEmitter<any> = new EventEmitter<any>();


  public active;

  constructor(
    public verifierService: VerifierService
  ) { }

  ngOnInit(): void {
    if (this.tabs[0]) {
      this.active = this.tabs[0].id;
    }
  }

  onTabChange(tab) {
    this.verifierService.closeVerifier();
    this.active = tab.id;
    this.onChange.emit(tab);
  }

}
