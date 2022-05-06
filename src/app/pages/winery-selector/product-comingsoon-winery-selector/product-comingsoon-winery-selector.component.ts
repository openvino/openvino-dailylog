import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-comingsoon-winery-selector',
  templateUrl: './product-comingsoon-winery-selector.component.html',
  styleUrls: ['./product-comingsoon-winery-selector.component.scss']
})
export class ProductComingsoonWinerySelectorComponent implements OnInit {

  @Input() public product;
  @Output() public onProductClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onClick() {
    this.onProductClick.emit(this.product);
  }

}
