import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodeFormComponent } from './promo-code-form.component';

describe('PromoCodeFormComponent', () => {
  let component: PromoCodeFormComponent;
  let fixture: ComponentFixture<PromoCodeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoCodeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoCodeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
