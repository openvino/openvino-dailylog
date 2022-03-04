import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductWinerySelectorComponent } from './product-winery-selector.component';

describe('ProductWinerySelectorComponent', () => {
  let component: ProductWinerySelectorComponent;
  let fixture: ComponentFixture<ProductWinerySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductWinerySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductWinerySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
