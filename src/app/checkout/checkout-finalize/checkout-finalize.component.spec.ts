import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutFinalizeComponent } from './checkout-finalize.component';

describe('CheckoutFinalizeComponent', () => {
  let component: CheckoutFinalizeComponent;
  let fixture: ComponentFixture<CheckoutFinalizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutFinalizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutFinalizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
