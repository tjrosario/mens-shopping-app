import { Component, OnInit, Input, Inject, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { CookiesService } from '@ngx-utils/cookies';
import { DOCUMENT } from '@angular/common';

import * as _ from 'lodash';

import { RecurlyService } from '../services/recurly.service';
import { UtilsService } from '../services/utils.service';
import { CREDIT_CARDS } from '../data/credit-cards';import { EventTrackingService } from '../services/event-tracking.service';
import { NotificationService } from '../services/notification.service';
import { User } from '../models/user.model';
import { ModalShippingAddressFormComponent } from '../modals/modal-shipping-address-form/modal-shipping-address-form.component';
import { Address } from '../models/address.model';
import { AddressService } from '../services/address.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../services/customer.service';
import { AuthService } from '../services/auth.service';

const now = new Date();

declare let recurly: Function;

@Component({
  selector: 'app-recurly-subscription-form',
  templateUrl: './recurly-subscription-form.component.html',
  styleUrls: ['./recurly-subscription-form.component.scss']
})
export class RecurlySubscriptionFormComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private recurlyService: RecurlyService,
    private utilsService: UtilsService,
    private cookiesService: CookiesService,
    private notificationService: NotificationService,
    private eventTrackingService: EventTrackingService,
    private addressService: AddressService,
    private modalService: NgbModal,
    private customerService: CustomerService,
    private authService: AuthService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: any
  ) {}

  @Input()
  data? = {};

  @Input()
  billingInfo? = {};

  @Input()
  shippingInfo? = {};

  @Input()
  shippingAddresses? = [];

  @Input()
  mode = 'edit';

  @Input()
  user: User;

  recurlySubscriptionForm: FormGroup;

  plans = [];
  budgets = [];
  frequencies = [];

  startDate: NgbDateStruct;

  today = {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
    day: now.getDate() 
  }

  minDate = this.today;
  selectedCreditCardBrand = {};
  loadingPayment = false;
  changingBillingInfo = false;
  loading = false;

  selectedAddress: null;

  loadingPlans = false;

  ngOnInit() {
    this.createForm();
    this.getPlans();

    if (this.shippingInfo) {
      this.selectAddress(this.shippingInfo['id']);
    }

    if (this.billingInfo) {
      this.setSelectedCard(this.billingInfo);
    }
  }

  handleError(error) {
    this.notificationService.alert(error);
    this.loading = false;
  }

  getCustomer(opts?) {
    opts = opts || {};
    opts.callback = opts.callback || (() => {});

    const config = {
      params: {
        //'customer.id': this.currentUser.id,
        expand: 'addresses'
      }
    };

    this.customerService.get({ config })
      .subscribe(user => {
        this.authService.setCurrentUser(user);
        this.shippingAddresses = user.addresses;
        opts.callback();
      });
  }

  addShippingAddress() {
    const modalRef = this.modalService.open(ModalShippingAddressFormComponent);
    modalRef.componentInstance.address = {};
    modalRef.componentInstance.mode = 'add';

    modalRef.result.then((form) => {
      const formData = form.shippingForm.value;
      formData['customer.id'] = this.user.id;
      formData['addresseeEmail'] = this.user.email;
      formData['type'] = 'shipping';
      formData['isDefault'] = true;

      const config = {
        params: formData
      };

      this.renderer.addClass(this.document.body, 'modal-open');

      this.addressService.create({ config })
        .subscribe(address => {
          this.notificationService.success('Shipping Address Added');
          
          this.shippingInfo = address;
          this.selectAddress(address.id);
          this.getCustomer();
        });
    }, (reason) => {});

    this.eventTrackingService.trackEvent({
      action: 'Add Shipping Address Click',
      category: 'Shipping Address',
      label: 'Add Shipping Address'
    });
  }

  editShippingAddress() {
    const modalRef = this.modalService.open(ModalShippingAddressFormComponent);
    const address = this.shippingInfo;

    modalRef.componentInstance.address = _.cloneDeep(address);
    modalRef.componentInstance.mode = 'edit';

    modalRef.result.then((form) => {
      const formData = form.shippingForm.value;
      formData['isDefault'] = true;

      const config = {
        params: formData
      };

      const id = address['id'];

      this.addressService.update({ id, config })
        .subscribe(addressUpdate => {
          this.notificationService.success('Shipping Address Updated');

          this.shippingInfo = addressUpdate;
          this.getCustomer();

          this.eventTrackingService.trackEvent({
            action: 'Edit Shipping Address Submit',
            category: 'Shipping Address',
            label: 'Edit Shipping Address'
          });
        });
    }, (reason) => {});

    this.eventTrackingService.trackEvent({
      action: 'Edit Shipping Address Click',
      category: 'Shipping Address',
      label: 'Edit Shipping Address'
    });
  }

  createRecurlyAccount(opts) {
    opts = opts || {};
    opts.callback = opts.callback || (() => {});

    const account_code = this.user.email;

    const data = {
      account_code,
      email: account_code,
      first_name: this.user.firstName,
      last_name: this.user.lastName
    };

    this.eventTrackingService.trackEvent({
      action: 'Add Billing Account Submit',
      category: 'Subscriptions',
      label: 'Add Billing Account',
      non_interaction: true
    });

    this.recurlyService.createAccount({ data })
      .subscribe(
        account => {
          opts.callback();
        });
  }

  updatePaymentMethod(err, token) {
    this.loadingPayment = true;

    this.eventTrackingService.trackEvent({
      action: 'Edit Billing Info Submit',
      category: 'Subscriptions',
      label: 'Edit Billing Info'
    });

    if (err) {
      this.handleError(err.message);
      this.loadingPayment = false;
    } else {
      // first check if account exists
      const account_code = this.user.email;

      this.recurlyService.getAccount({ account_code })
        .subscribe(
          account => {
            account = account.account;

            const biData = {
              token_id: token.id
            };

            this.recurlyService.createAccountBillingInfo({ account_code: account.account_code, data: biData })
              .subscribe(
                billingInfo => {
                  this.billingInfo = billingInfo.billing_info;
                  this.setSelectedCard(this.billingInfo);
                  this.loadingPayment = false;
                  this.changingBillingInfo = false;
                  this.notificationService.success('Billing Info Added');
                },
                error => {
                  this.loadingPayment = false;
                });
          },
          error => {
            // create account
            this.createRecurlyAccount({
              callback: () => {
                this.updatePaymentMethod(err, token);
              }
            });
          });
    }
  }

  selectPaymentMethod(method) {
    var paypal = window['recurly'].PayPal({
      display: { displayName: ' My product ' }
    });

    paypal.on('error', function (err) {
      console.log(err);
    });

    switch(method) {
      case 'paypal':
        setTimeout(() => {
          paypal.start();
        }, 100);
        break;
    }
  }

  setSelectedCard(billingInfo) {
    this.selectedCreditCardBrand = _.find(CREDIT_CARDS, { brand: billingInfo.card_type });
  }

  normalizeData(plans) {
    // get a set of unique plan budgets
    const uniqueBudgets = _.uniqBy(plans, 'unit_amount_in_cents.USD._');
    const uniqueFrequencies = _.uniqBy(plans, 'plan_interval_length._');

    const budgets = _.map(uniqueBudgets, plan => {
      let p = _.pick(plan, ['unit_amount_in_cents.USD._', 'description']);
      p['amount_in_cents'] = parseInt(p['unit_amount_in_cents']['USD']['_'], 10);
      return p;
    });

    const frequencies = _.map(uniqueFrequencies, plan => {
      let f = _.pick(plan, ['plan_interval_length._', 'plan_interval_unit', 'plan_code']);

      const intervalLength = plan['plan_interval_length']['_'];
      f['plan_interval_length_number'] = parseInt(intervalLength, 10);

      const formattedInterval = this.utilsService.getFormattedInterval(plan);

      f['plan_interval_display_string'] = formattedInterval['displayString'];
      f['plan_frequency_code'] = formattedInterval['frequencyCode'];
      return f;
    });

    const rank = {
      days: 1,
      months: 2
    };

    const sortedFrequencies = _.sortBy(frequencies, frequency => [rank[frequency['plan_interval_unit']], frequency['plan_interval_length_number']]);


    this.budgets = _.orderBy(budgets, ['amount_in_cents'], ['asc']);

    //this.frequencies = _.orderBy(frequencies, ['plan_interval_length_number'], ['asc']);
    this.frequencies = sortedFrequencies;

    return plans;
  }

  getPlans() {
    this.loadingPlans = true;
    this.recurlyService.getPlans({})
      .subscribe(plans => {
        this.plans = this.normalizeData(plans.plans.plan);
        this.loadingPlans = false;
      });
  }

  updateForm() {
    const budget = parseInt(this.data['budget'], 10) / 100;
    const frequency_code = this.data['frequency_code'];
    const plan_code = `${budget}_${frequency_code}`;

    this.data['plan_code'] = plan_code;
  }

  createForm() {
    const data = this.data;
    const mode = this.mode;
    let address;

    const current = _.cloneDeep(data);

    if (data['current_period_started_at']) {
      const date = new Date(data['current_period_started_at']['_']);
      this.startDate = {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate() 
      };

      this.minDate = this.startDate;
    }

    if (typeof data['customer_notes'] !== 'string') {
      data['customer_notes'] = '';
    }

    if (data['plan_code']) {
      const split = data['plan_code'].split('_');
      data['budget'] = (parseInt(split[0], 10) * 100).toString();
      data['frequency_code'] = `${split[1]}_${split[2]}`;
    } else {
      data['budget'] = data['budget'].toString() || '14900';
      data['frequency_code'] = data['frequency_code'].toString() || '1_months';
    }

    const promoCode = this.cookiesService.get('promoCode');
    if (promoCode) {
      data['coupon_code'] = promoCode;
    } else {
      data['coupon_code'] = null;
    }

    if (this.shippingInfo) {
      address = this.shippingInfo['id'];
    }

    this.updateForm();

    let fbGroup = {
      'uuid': [data['uuid']],
      'budget': [data['budget'], Validators.required],
      'frequency_code': [data['frequency_code'], Validators.required],
      'plan_code': [data['plan_code'], Validators.required],
      'coupon_code': [data['coupon_code']],
      //'startDate': [this.startDate, Validators.required],
      'customer_notes': [data['customer_notes']],
      'mode': [mode],
      'address': address
    };

    this.recurlySubscriptionForm = this.fb.group(fbGroup);
  }

  selectAddress(addressId) {
    this.selectedAddress = addressId;

    const found = _.find(this.shippingAddresses, { id: this.selectedAddress });

    if (found && (found.id !== this.shippingInfo['id'])) {
      this.shippingInfo = found;
    }
  }

  onSubmit() {}
}
