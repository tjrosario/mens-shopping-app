import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { OrderItem } from '../../models/order-item.model';
import { OrderReason } from '../../models/order-reason.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-item-reject-form',
  templateUrl: './order-item-reject-form.component.html',
  styleUrls: ['./order-item-reject-form.component.scss']
})
export class OrderItemRejectFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService
  ) {}

  @Input()
  data?: OrderItem = {};

  orderItemRejectForm: FormGroup;

  rejectReasons: OrderReason[];

  ngOnInit() {
    this.getRejectReasons();
    this.createForm();
  }

  createForm() {
    const data = this.data;

    this.orderItemRejectForm = this.fb.group({
      'rejectReasons': [data['rejectReasons'], Validators.required],
      'comments': [data['comments']]
    });
  }

  getRejectReasons() {
    this.orderService.getRejectReasons()
      .subscribe(rejectReasons => {
        this.rejectReasons = rejectReasons;
      });
  }

  onSubmit() {}
}
