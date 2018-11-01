import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountReferralsComponent } from './account-referrals.component';

describe('AccountReferralsComponent', () => {
  let component: AccountReferralsComponent;
  let fixture: ComponentFixture<AccountReferralsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountReferralsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountReferralsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
