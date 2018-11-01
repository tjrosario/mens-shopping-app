import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecurlySubscriptionFormComponent } from './modal-recurly-subscription-form.component';

describe('ModalRecurlySubscriptionFormComponent', () => {
  let component: ModalRecurlySubscriptionFormComponent;
  let fixture: ComponentFixture<ModalRecurlySubscriptionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRecurlySubscriptionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecurlySubscriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
