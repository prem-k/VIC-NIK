import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRequestComponent } from './purchase-request.component';

describe('PurchaseRequestComponent', () => {
  let component: PurchaseRequestComponent;
  let fixture: ComponentFixture<PurchaseRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaseRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
