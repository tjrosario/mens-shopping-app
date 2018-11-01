import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { OrderItemReturnFormComponent } from '../../order/order-item-return-form/order-item-return-form.component';
import { OrderItem } from '../../models/order-item.model';

@Component({
  selector: 'app-modal-order-item-return-form',
  templateUrl: './modal-order-item-return-form.component.html',
  styleUrls: ['./modal-order-item-return-form.component.scss']
})
export class ModalOrderItemReturnFormComponent implements OnInit {

  @ViewChild(OrderItemReturnFormComponent) orderItemReturnForm: OrderItemReturnFormComponent;

  constructor(public activeModal: NgbActiveModal) {}

  @Input()
  orderItem: OrderItem;


  ngOnInit() {
  }

}
