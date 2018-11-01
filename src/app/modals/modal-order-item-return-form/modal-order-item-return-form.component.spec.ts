import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderItemReturnFormComponent } from './modal-order-item-return-form.component';

describe('ModalOrderItemReturnFormComponent', () => {
  let component: ModalOrderItemReturnFormComponent;
  let fixture: ComponentFixture<ModalOrderItemReturnFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOrderItemReturnFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrderItemReturnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
