import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSubscriptionFormComponent } from './modal-subscription-form.component';

describe('ModalSubscriptionFormComponent', () => {
  let component: ModalSubscriptionFormComponent;
  let fixture: ComponentFixture<ModalSubscriptionFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalSubscriptionFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSubscriptionFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
