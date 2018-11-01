import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecurlyFormComponent } from './recurly-form.component';

describe('RecurlyFormComponent', () => {
  let component: RecurlyFormComponent;
  let fixture: ComponentFixture<RecurlyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecurlyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecurlyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
