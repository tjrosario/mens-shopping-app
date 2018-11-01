import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderItemRejectFormComponent } from './order-item-reject-form.component';

describe('OrderItemRejectFormComponent', () => {
  let component: OrderItemRejectFormComponent;
  let fixture: ComponentFixture<OrderItemRejectFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderItemRejectFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderItemRejectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
