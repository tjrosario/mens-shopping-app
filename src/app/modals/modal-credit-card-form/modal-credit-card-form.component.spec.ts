import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCreditCardFormComponent } from './modal-credit-card-form.component';

describe('ModalCreditCardFormComponent', () => {
  let component: ModalCreditCardFormComponent;
  let fixture: ComponentFixture<ModalCreditCardFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCreditCardFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCreditCardFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
