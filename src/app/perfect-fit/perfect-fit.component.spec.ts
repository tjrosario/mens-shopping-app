import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfectFitComponent } from './perfect-fit.component';

describe('PerfectFitComponent', () => {
  let component: PerfectFitComponent;
  let fixture: ComponentFixture<PerfectFitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfectFitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfectFitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
