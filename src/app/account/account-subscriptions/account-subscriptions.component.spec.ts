import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSubscriptionsComponent } from './account-subscriptions.component';

describe('AccountSubscriptionsComponent', () => {
  let component: AccountSubscriptionsComponent;
  let fixture: ComponentFixture<AccountSubscriptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSubscriptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSubscriptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
