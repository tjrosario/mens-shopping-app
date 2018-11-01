import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';
import { BoxService } from '../../services/box.service';
import { Box } from '../../models/box.model';
import { Globals } from '../../config/globals';

@Component({
  selector: 'app-account-orders',
  templateUrl: './account-orders.component.html',
  styleUrls: ['./account-orders.component.scss']
})
export class AccountOrdersComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private authService: AuthService,
    private boxService: BoxService,
    private globals: Globals
  ) { }

  assetUrl = this.globals.assetUrl;

  currentUser: User;
  orders: Order[] = [];
  boxItemsList: Box[];

  loading = false;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
        this.getBoxes({
          callback: () => {
            this.getOrders();
          }
        });
      });
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

  getOrders() {
    const config = {
      params: {
        //'customer.id': this.currentUser.id,
        expand: 'orders/productNeeds/productCategory,orders/orderItems/products'
      }
    };

    this.loading = true;

    this.customerService.get({ config })
      .subscribe(user => {
        this.authService.setCurrentUser(user);
        this.currentUser = user;

        this.orders = this.normalizeData(user.orders);
        this.loading = false;
      });
  }

  normalizeData(data) {
    let orders = _.cloneDeep(data);

    orders = _.filter(orders, order => {
      return order.status !== 'new' &&
        order.status !== 'abandoned' &&
        order.status !== 'empty';
    });

    _.each(orders, order => {
      order.box = this.getBox(order.budget);
    });

    return orders;
  }

}
