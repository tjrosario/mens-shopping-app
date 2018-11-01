import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetStartedCtaComponent } from './get-started-cta.component';

describe('GetStartedCtaComponent', () => {
  let component: GetStartedCtaComponent;
  let fixture: ComponentFixture<GetStartedCtaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetStartedCtaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetStartedCtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
