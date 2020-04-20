import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter } from '@angular/core';
import { YEARS } from '../product.config';
import { VerifierService } from '../verifier/verifier.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {

  @Output() public onDateChange: EventEmitter<any> = new EventEmitter<any>();

  public active = false;

  public years = [];
  public months = [];

  public selectedYear = '0';
  public selectedMonth = '0';

  constructor(
    public verifierService: VerifierService
  ) { }

  ngOnInit() {
    this.years = YEARS;
    this.months = Array.from(Array(12).keys());

    this.selectedMonth = new Date().getMonth().toString();
    this.selectedYear = new Date().getFullYear().toString();

    this.onSelectChange();
  }

  public onSelectChange() {
    this.verifierService.closeVerifier();

    this.onDateChange.emit({
      year: this.selectedYear,
      month: this.selectedMonth == '-1' ? null : parseInt(this.selectedMonth)
    })
  }
}
