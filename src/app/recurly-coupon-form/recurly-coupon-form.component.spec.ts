import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurlyCouponFormComponent } from './recurly-coupon-form.component';

describe('RecurlyCouponFormComponent', () => {
  let component: RecurlyCouponFormComponent;
  let fixture: ComponentFixture<RecurlyCouponFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurlyCouponFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurlyCouponFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
