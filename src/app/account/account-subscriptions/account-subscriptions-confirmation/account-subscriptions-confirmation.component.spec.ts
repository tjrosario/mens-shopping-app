import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSubscriptionsConfirmationComponent } from './account-subscriptions-confirmation.component';

describe('AccountSubscriptionsConfirmationComponent', () => {
  let component: AccountSubscriptionsConfirmationComponent;
  let fixture: ComponentFixture<AccountSubscriptionsConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSubscriptionsConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSubscriptionsConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
