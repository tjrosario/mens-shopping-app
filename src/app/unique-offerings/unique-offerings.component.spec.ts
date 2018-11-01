import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueOfferingsComponent } from './unique-offerings.component';

describe('UniqueOfferingsComponent', () => {
  let component: UniqueOfferingsComponent;
  let fixture: ComponentFixture<UniqueOfferingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniqueOfferingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniqueOfferingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
