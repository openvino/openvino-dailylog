import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductComingsoonWinerySelectorComponent } from './product-comingsoon-winery-selector.component';

describe('ProductComingsoonWinerySelectorComponent', () => {
  let component: ProductComingsoonWinerySelectorComponent;
  let fixture: ComponentFixture<ProductComingsoonWinerySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductComingsoonWinerySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComingsoonWinerySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
