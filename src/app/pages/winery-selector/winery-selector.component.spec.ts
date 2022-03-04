import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinerySelectorComponent } from './winery-selector.component';

describe('SelectorComponent', () => {
  let component: WinerySelectorComponent;
  let fixture: ComponentFixture<WinerySelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinerySelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinerySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
