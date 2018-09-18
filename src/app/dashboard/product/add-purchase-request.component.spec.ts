import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseRequestComponent } from './add-purchase-request.component';

describe('AddPurchaseRequestComponent', () => {
  let component: AddPurchaseRequestComponent;
  let fixture: ComponentFixture<AddPurchaseRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPurchaseRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
