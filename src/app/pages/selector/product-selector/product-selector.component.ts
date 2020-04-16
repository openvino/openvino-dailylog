import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'product-selector',
  templateUrl: './product-selector.component.html',
  styleUrls: ['./product-selector.component.scss']
})
export class ProductSelectorComponent implements OnInit {

  @Input() public product;
  @Output() public onProductClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  public onClick() {
    this.onProductClick.emit(this.product);
  }

}
