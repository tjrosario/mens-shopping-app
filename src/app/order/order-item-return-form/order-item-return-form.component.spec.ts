import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemReturnFormComponent } from './order-item-return-form.component';

describe('OrderItemReturnFormComponent', () => {
  let component: OrderItemReturnFormComponent;
  let fixture: ComponentFixture<OrderItemReturnFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemReturnFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemReturnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
