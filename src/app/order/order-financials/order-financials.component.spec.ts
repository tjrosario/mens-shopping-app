import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFinancialsComponent } from './order-financials.component';

describe('OrderFinancialsComponent', () => {
  let component: OrderFinancialsComponent;
  let fixture: ComponentFixture<OrderFinancialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderFinancialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFinancialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
