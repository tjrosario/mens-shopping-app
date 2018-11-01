import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrderItem } from '../../models/order-item.model';
import { OrderReason } from '../../models/order-reason.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-item-return-form',
  templateUrl: './order-item-return-form.component.html',
  styleUrls: ['./order-item-return-form.component.scss']
})
export class OrderItemReturnFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService
  ) {}

  @Input()
  data?: OrderItem = {};

  orderItemReturnForm: FormGroup;

  returnReasons: OrderReason[];

  ngOnInit() {
    this.getReturnReasons();
    this.createForm();
  }

  createForm() {
    const data = this.data;

    this.orderItemReturnForm = this.fb.group({
      'returnReasons': [data['returnReasons'], Validators.required],
      'comments': [data['comments']]
    });
  }

  getReturnReasons() {
    this.orderService.getReturnReasons()
      .subscribe(returnReasons => {
        this.returnReasons = returnReasons;
      });
  }

  onSubmit() {}
}
