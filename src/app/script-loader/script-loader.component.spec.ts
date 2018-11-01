import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScriptLoaderComponent } from './script-loader.component';

describe('ScriptLoaderComponent', () => {
  let component: ScriptLoaderComponent;
  let fixture: ComponentFixture<ScriptLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScriptLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScriptLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
