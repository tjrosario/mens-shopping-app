import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrandPreferencesComponent } from './brand-preferences.component';

describe('BrandPreferencesComponent', () => {
  let component: BrandPreferencesComponent;
  let fixture: ComponentFixture<BrandPreferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrandPreferencesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrandPreferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
