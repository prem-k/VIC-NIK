import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectSaleComponent } from './direct-sale.component';

describe('DirectSaleComponent', () => {
  let component: DirectSaleComponent;
  let fixture: ComponentFixture<DirectSaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectSaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
