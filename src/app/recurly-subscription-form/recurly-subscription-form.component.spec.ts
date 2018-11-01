import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurlySubscriptionFormComponent } from './recurly-subscription-form.component';

describe('RecurlySubscriptionFormComponent', () => {
  let component: RecurlySubscriptionFormComponent;
  let fixture: ComponentFixture<RecurlySubscriptionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurlySubscriptionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurlySubscriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
