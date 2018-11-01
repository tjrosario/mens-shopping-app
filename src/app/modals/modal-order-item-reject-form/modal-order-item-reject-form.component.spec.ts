import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderItemRejectFormComponent } from './modal-order-item-reject-form.component';

describe('ModalOrderItemRejectFormComponent', () => {
  let component: ModalOrderItemRejectFormComponent;
  let fixture: ComponentFixture<ModalOrderItemRejectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOrderItemRejectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrderItemRejectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
