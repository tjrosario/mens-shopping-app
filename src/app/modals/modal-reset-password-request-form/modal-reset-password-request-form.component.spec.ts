import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResetPasswordRequestFormComponent } from './modal-reset-password-request-form.component';

describe('ModalResetPasswordRequestFormComponent', () => {
  let component: ModalResetPasswordRequestFormComponent;
  let fixture: ComponentFixture<ModalResetPasswordRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalResetPasswordRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResetPasswordRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
