import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalShippingAddressFormComponent } from './modal-shipping-address-form.component';

describe('ModalShippingAddressFormComponent', () => {
  let component: ModalShippingAddressFormComponent;
  let fixture: ComponentFixture<ModalShippingAddressFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalShippingAddressFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalShippingAddressFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
