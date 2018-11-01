import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountShippingComponent } from './account-shipping.component';

describe('AccountShippingComponent', () => {
  let component: AccountShippingComponent;
  let fixture: ComponentFixture<AccountShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
