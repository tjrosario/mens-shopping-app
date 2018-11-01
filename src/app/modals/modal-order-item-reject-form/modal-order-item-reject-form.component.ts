import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { OrderItemRejectFormComponent } from '../../order/order-item-reject-form/order-item-reject-form.component';
import { OrderItem } from '../../models/order-item.model';

@Component({
  selector: 'app-modal-order-item-reject-form',
  templateUrl: './modal-order-item-reject-form.component.html',
  styleUrls: ['./modal-order-item-reject-form.component.scss']
})
export class ModalOrderItemRejectFormComponent implements OnInit {

  @ViewChild(OrderItemRejectFormComponent) orderItemRejectForm: OrderItemRejectFormComponent;

  constructor(public activeModal: NgbActiveModal) {}

  @Input()
  orderItem: OrderItem;


  ngOnInit() {
  }

}
