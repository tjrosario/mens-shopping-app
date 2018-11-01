import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPromoComponent } from './modal-promo.component';

describe('ModalPromoComponent', () => {
  let component: ModalPromoComponent;
  let fixture: ComponentFixture<ModalPromoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPromoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPromoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
