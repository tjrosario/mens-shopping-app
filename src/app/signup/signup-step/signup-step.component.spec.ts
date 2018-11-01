import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStepComponent } from './signup-step.component';

describe('SignupStepComponent', () => {
  let component: SignupStepComponent;
  let fixture: ComponentFixture<SignupStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
