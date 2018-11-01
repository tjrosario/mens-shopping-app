import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as _ from 'lodash';
import { User } from '../../models/user.model';
import { Order } from '../../models/order.model';
import { Box } from '../../models/box.model';
import { CreditCard } from '../../models/credit-card.model';
import { CustomerService } from '../../services/customer.service';
import { StripeService } from '../../services/stripe.service';
import { BoxService } from '../../services/box.service';
import { NotificationService } from '../../services/notification.service';
import { SubscriptionService } from '../../services/subscription.service';
import { UtilsService } from '../../services/utils.service';
import { FREQUENCIES, BUDGETS } from '../../data/subscriptions';
import { environment } from '../../../environments/environment';
import { Globals } from '../../config/globals';
import { UserProfileFormComponent } from '../../user-profile-form/user-profile-form.component';

@Component({
  selector: 'app-admin-customers',
  templateUrl: './admin-customers.component.html',
  styleUrls: ['./admin-customers.component.scss']
})
export class AdminCustomersComponent implements OnInit {

  @ViewChild(UserProfileFormComponent) userProfileForm: UserProfileFormComponent;

  constructor(
  	private fb: FormBuilder,
  	private customerService: CustomerService,
  	private subscriptionService: SubscriptionService,
  	private stripeService: StripeService,
    private boxService: BoxService,
    private globals: Globals,
    private notificationService: NotificationService,
    private utilsService: UtilsService
  ) { }

  assetUrl = this.globals.assetUrl;

  customers: User[] = null;
  orders: Order[] = null;
  cards: CreditCard[] = null;
  boxItemsList: Box[];

  customerForm: FormGroup;

  loading = false;
  profileLoading = false;

  stripeDashboardUrl = this.stripeService.getDashBoardUrl();

  opsUrl = this.getOpsUrl();

  ngOnInit() {
    this.createForm();
    this.getBoxes();
  }

  getOpsUrl() {
  	return environment.production ? 'http://ops.mythreadlab.com' : 'http://ops-t.mythreadlab.com';
  }

  isValid() {
  	return this.customerForm.value.email !== '' ||
  		this.customerForm.value.firstName !== '' ||
  		this.customerForm.value.lastName !== '';
  }

  onProfileSubmit() {
    const params = _.merge(this.userProfileForm.profileForm.value, {
      'customer.id': this.customers[0].id,
    });

    const config = {
      params
    };

    this.profileLoading = true;

    this.customerService.update_admin({ config })
      .subscribe(user => {
        this.notificationService.success('Customer profile updated');
        this.profileLoading = false;
      });
  }

  onSubmit() {
  	const params = _.omitBy(this.customerForm.value, _.isEmpty);

  	params['expand'] = 'subscriptions,orders/productNeeds/productCategory,orders/orderItems/products';

    const config = {
      params
    };

    this.loading = true;
    this.customerService.find({ config })
      .subscribe(user => {
      	this.customers = [];
      	
      	if (user) {
      		user.subscriptions = this.normalizeSubscriptions(user.subscriptions);
          user.orders = this.normalizeOrders(user.orders);

          if (user.paymentCustomerId) {
            this.getBilling(user);
          }
          
      		this.customers.push(user);
      	}

      	this.loading = false;
      });
  }

  getBilling(user) {
    const id = user.paymentCustomerId;

    this.loading = true;
    this.stripeService.getCustomer({ id })
      .subscribe(stripeCustomer => {
        this.cards = [];

        if (stripeCustomer.error) {
          this.handleError(stripeCustomer.error.message);
        } else {
          this.cards = this.getCardData(stripeCustomer.sources.data);
          this.loading = false;
        }
      });
    
  }

  getCardData(cards) {
    _.each(cards, card => {
      card.logo = this.utilsService.getCreditCardLogo(card.brand);
    });

    return cards;
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

  normalizeSubscriptions(data) {
    const subscriptions = _.cloneDeep(data);

    _.each(subscriptions, subscription => {
      subscription.frequencyData = this.getFrequencyData(subscription);
      subscription.budgetData = this.getBudgetData(subscription);

      // suspend any disabled plans
      if (!subscription.frequencyData.enabled && subscription.status === 'active') {
        const id = subscription.id;

        const params = {
          status: 'suspended'
        };

        const config = {
          params
        }

        this.subscriptionService.update({ id, config })
          .subscribe(subscription => {
            //console.log(subscription);
          });
      }
    });

    return subscriptions;
  }

  createForm() {
    this.customerForm = this.fb.group({
      'firstName': [''],
      'lastName': [''],
      'email': ['', [
        //Validators.required,
        //Validators.email
      ]],
    });
  }

  getFrequencyData(data) {
    return _.find(FREQUENCIES, { value: data.frequency });
  }

  getBudgetData(data) {
    return _.find(BUDGETS, { value: data.budget });
  }

  handleError(error) {
    this.notificationService.alert(error);
    this.loading = false;
  }
}
