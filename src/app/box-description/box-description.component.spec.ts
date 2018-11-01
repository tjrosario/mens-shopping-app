import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxDescriptionComponent } from './box-description.component';

describe('BoxDescriptionComponent', () => {
  let component: BoxDescriptionComponent;
  let fixture: ComponentFixture<BoxDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoxDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoxDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
