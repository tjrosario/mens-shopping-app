import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';
import { Order } from '../../models/order.model';
import { Box } from '../../models/box.model';
import { OrderService } from '../../services/order.service';
import { BoxService } from '../../services/box.service';
import { environment } from '../../../environments/environment';
import { Globals } from '../../config/globals';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {

  constructor(
  	private fb: FormBuilder,
  	private orderService: OrderService,
    private boxService: BoxService,
    private globals: Globals
  ) { }

  assetUrl = this.globals.assetUrl;

  orders: Order[] = null;
  boxItemsList: Box[];

  orderForm: FormGroup;

  loading = false;

  opsUrl = this.getOpsUrl();

  ngOnInit() {
  	this.createForm();
  	this.getBoxes();
  }

  getOpsUrl() {
  	return environment.production ? 'http://ops.mythreadlab.com' : 'http://ops-t.mythreadlab.com';
  }

  onSubmit() {
  	const params = this.orderForm.value;

  	params['expand'] = 'orderItems/product,productNeeds/productCategory';

  	const config = {
  		params
  	};

  	this.loading = true;
    this.orderService.findByOrderNumberAlt({ config })
      .subscribe(order => {
      	this.orders = [];

        if (order) {
          this.orders.push(order);
          this.orders = this.normalizeOrders(this.orders);
        }

        this.loading = false;
      });
  }

  normalizeOrders(data) {
    let orders = _.cloneDeep(data);

    orders = _.filter(orders, order => {
      return order.status !== 'initialized' &&
        order.status !== 'new' &&
        order.status !== 'abandoned' &&
        order.status !== 'empty';
    });

    _.each(orders, order => {
      order.box = this.getBox(order.budget);
    });

    return orders;
  }

  getBoxes(opts?) {
    opts = opts || {};
    opts.callback = opts.callback || (() => {});

    this.boxService.getBoxes().
      subscribe(boxItems => {
        this.boxItemsList = boxItems[0].list;
        opts.callback();
      });
  }

  getBox(price) {
    return _.find(this.boxItemsList, { price });
  }

  createForm() {
    this.orderForm = this.fb.group({
      'orderNumber': ['', Validators.required]
    });
  }
}
