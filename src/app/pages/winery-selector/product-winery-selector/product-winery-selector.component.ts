import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-winery-selector',
  templateUrl: './product-winery-selector.component.html',
  styleUrls: ['./product-winery-selector.component.scss']
})
export class ProductWinerySelectorComponent implements OnInit {

  @Input() public product;
  @Output() public onProductClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onClick() {
    this.onProductClick.emit(this.product);
  }

}
