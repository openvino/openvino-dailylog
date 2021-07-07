import { Component, OnInit, ViewChild, ElementRef, Renderer2, Output, EventEmitter, Input } from '@angular/core';
import { YEARS } from '../product.config';
import { VerifierService } from '../verifier/verifier.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.scss']
})
export class DateSelectorComponent implements OnInit {

  @Input() public year: number = new Date().getFullYear();
  @Output() public onDateChange: EventEmitter<any> = new EventEmitter<any>();

  public active = false;

  public years = [];
  public months = [];
  public days = [];

  public selectedMonth: number = null;
  public selectedDay: number = null;

  constructor(
    public verifierService: VerifierService
  ) { }

  ngOnInit() {
    this.years = YEARS;
    this.months = [4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3]

    this.selectedMonth = new Date().getMonth();

    this.onSelectChange();
  }

  public onSelectChange(clearDay = false) {
    if (clearDay) {
      this.selectedDay = null
    }
    
    if (this.selectedMonth != null) {
      this.days = Array.from(Array(new Date(new Date().getFullYear(), this.selectedMonth + 1, 0).getDate()).keys()).map(i => ++i);
    }

    this.verifierService.closeVerifier();

    this.onDateChange.emit({
      year: this.getYearByMonth(this.selectedMonth),
      month: this.selectedMonth != null ? Number(this.selectedMonth) + 1: null,
      day: this.selectedDay,
    })
  }

  public getYearByMonth(month: number) {
    return month < 6 ? this.year : this.year - 1
  }
}
