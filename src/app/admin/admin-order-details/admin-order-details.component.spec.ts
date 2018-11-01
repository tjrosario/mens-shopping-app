import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminOrderDetailsComponent } from './admin-order-details.component';

describe('AdminOrderDetailsComponent', () => {
  let component: AdminOrderDetailsComponent;
  let fixture: ComponentFixture<AdminOrderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminOrderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminOrderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
