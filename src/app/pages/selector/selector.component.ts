import { Component, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss']
})
export class SelectorComponent implements OnInit {

  public productList = [];

  constructor(
    public router: Router,
    public coreService: CoreService
  ) { }

  ngOnInit(): void {
    this.productList = this.coreService.getProductList()
  }

  onProductClick(product) {
    this.router.navigate([`${product.id}`])
  }
}
