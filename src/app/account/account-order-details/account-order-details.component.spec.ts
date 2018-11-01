import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderDetailsComponent } from './account-order-details.component';

describe('AccountOrderDetailsComponent', () => {
  let component: AccountOrderDetailsComponent;
  let fixture: ComponentFixture<AccountOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
