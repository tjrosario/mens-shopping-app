import { Component, OnInit } from '@angular/core';
import { CookiesService } from '@ngx-utils/cookies';
import { Router, ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { Globals } from '../../config/globals';
import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';
import { OrderService } from '../../services/order.service';
import { UtilsService } from '../../services/utils.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-checkout-confirm',
  templateUrl: './checkout-confirm.component.html',
  styleUrls: ['./checkout-confirm.component.scss']
})
export class CheckoutConfirmComponent implements OnInit {

  constructor(
  	private route: ActivatedRoute,
    private router: Router,
    private globals: Globals,
    private cookiesService: CookiesService,
    private orderService: OrderService,
    private utilsService: UtilsService,
    private customerService: CustomerService
  ) { }

  assetUrl = this.globals.assetUrl;

  currentUser: User;

  order: Order;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
        this.getOrder();
      });

    this.cookiesService.remove('promoCode');
  }

  getOrder() {
    const orderNumber = this.route.snapshot.paramMap.get('orderNumber');

    const config = {
      params: {
        orderNumber,
        expand: 'orderItems/product,productNeeds/productCategory,payments'
      }
    };

    this.orderService.findByOrderNumber({ config })
      .subscribe(order => {
        if (order.status === 'initialized') {
          this.order = order;
          this.sendReferralCandyReceipt();
        } else {
          this.router.navigate(['/home']);
        }
      });
  }

  sendReferralCandyReceipt() {
    //const paymentAmount = this.getFinalizationPayment().paymentAmount;
    const paymentAmount = this.order.budget;
    const now = new Date().toISOString();
    const timestamp = this.utilsService.rfcFormat(now, true);

    const data = {
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName,
      email: this.currentUser.email,
      invoiceValue: `${paymentAmount} USD`,
      timestamp,
      orderNumber: this.order.orderNumber
    };

    this.customerService.receipt({ data })
      .subscribe(user => {
        
      });
  }

  getFinalizationPayment() {
    const payment = _.find(this.order.payments, {
      comments: 'Finalization Payment'
    });

    return payment;
  }
}
