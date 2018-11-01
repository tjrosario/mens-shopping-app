import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CookiesService } from '@ngx-utils/cookies';

import * as _ from 'lodash';

import { Subscription } from '../../models/subscription.model';
import { User } from '../../models/user.model';
import { CustomerService } from '../../services/customer.service';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { Globals } from '../../config/globals';
import { FREQUENCIES, BUDGETS } from '../../data/subscriptions';
import { ModalRecurlySubscriptionFormComponent } from '../../modals/modal-recurly-subscription-form/modal-recurly-subscription-form.component';

import { ModalSimpleComponent } from '../../modals/modal-simple/modal-simple.component';
import { RecurlyService } from '../../services/recurly.service';
import { BoxService } from '../../services/box.service';
import { AddressService } from '../../services/address.service';
import { EventTrackingService } from '../../services/event-tracking.service';
import { Address } from '../../models/address.model';

@Component({
  selector: 'app-account-subscriptions',
  templateUrl: './account-subscriptions.component.html',
  styleUrls: ['./account-subscriptions.component.scss']
})
export class AccountSubscriptionsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private authService: AuthService,
    private globals: Globals,
    private modalService: NgbModal,
    private utilsService: UtilsService,
    private notificationService: NotificationService,
    private recurlyService: RecurlyService,
    private boxService: BoxService,
    private addressService: AddressService,
    private eventTrackingService: EventTrackingService,
    private cookiesService: CookiesService,
    private router: Router
  ) { }

  assetUrl = this.globals.assetUrl;

  currentUser: User;
  subscriptions = [];
  billingInfo = null;
  loading = false;
  loadingPayment = false;
  changingBillingInfo = false;

  boxSelectorTxt = 'Get Plan';
  boxColClass = 'span4';
  boxItems = [];
  addresses: Address[] = [];
  defaultShippingAddress: Address;

  frequencyMap = {
    '1': 'Monthly',
    '2': 'Bimonthly',
    '3': 'Quarterly'
  };

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
        this.getBoxItems();
        this.sanityCheck();
      });
  }

  sanityCheck() {
    // first check if account exists
    const account_code = this.currentUser.email;

    this.recurlyService.getAccountBillingInfo({ account_code })
      .subscribe(
        billingInfo => {
          this.billingInfo = billingInfo.billing_info;
          this.getSubscriptions();
        },
        error => {
          this.getSubscriptions();
        });

    this.getCustomer({
      callback: () => {
        this.getShipping();
      }
    });
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
        this.currentUser = user;
        opts.callback();
      });
  }

  getShipping() {
    const addresses = this.currentUser.addresses;
    const shippingAddresses = _.filter(addresses, address => {
      return address.type === 'shipping';
    });

    if (shippingAddresses.length > 0) {
      this.addresses = shippingAddresses;
      //this.defaultShippingAddress = this.getDefaultShippingAddress();
    }
  }

  getDefaultShippingAddress() {
    const user = this.authService.getCurrentUser();
    const addresses = user.addresses;

    return _.find(addresses, address => address.isDefault) || addresses[0];
  }

  getShippingAddresses() {
    const user = this.authService.getCurrentUser();
    const addresses = user.addresses;
    const shippingAddresses = _.filter(addresses, address => {
      return address.type === 'shipping';
    });

    return shippingAddresses;
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
      const account_code = this.currentUser.email;

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

  createRecurlyAccount(opts) {
    opts = opts || {};
    opts.callback = opts.callback || (() => {});

    const account_code = this.currentUser.email;

    const data = {
      account_code,
      email: account_code,
      first_name: this.currentUser.firstName,
      last_name: this.currentUser.lastName
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

  filterSubscriptions(subscriptions) {
    return _.filter(subscriptions, subscription => subscription.state !== 'expired');
  }

  normalizeData(subscriptions) {
    return _.map(subscriptions, subscription => {
      const { plan } = subscription;
      const { plan_code } = plan;
      const split = plan_code.split('_');
      const intervalLength = split[1];
      const unit = split[2];

      const box = this.getBox(subscription['unit_amount_in_cents']['_']);
      subscription['box'] = box;

      const p = {
        plan_interval_length: { _: intervalLength },
        plan_interval_unit: unit
      };

      const formattedInterval = this.utilsService.getFormattedInterval(p);

      subscription['plan_interval_display_string'] = formattedInterval['displayString'];

      return subscription;
    });
  }

  getBox(budget) {
    return _.find(this.boxItems, { budget: parseInt(budget, 10) });
  }

  getBoxItems() {
    this.boxService.getBoxes().
      subscribe(boxItems => {
        this.boxItems = boxItems[0].list;
      });
  }

  getSubscriptions() {
    const account_code = this.currentUser.email;

    this.loading = true;
    this.recurlyService.getAccountSubscriptions({ account_code })
      .subscribe(
        subscriptions => {
          const subs = subscriptions.subscriptions.subscription || [];

          if (!(subs instanceof Array)) {
            this.subscriptions = [subs]
          } else {
            this.subscriptions = subs;
          }

          this.subscriptions = this.filterSubscriptions(this.subscriptions);
          this.subscriptions = this.normalizeData(this.subscriptions);


          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }

  handleError(error) {
    this.notificationService.alert(error);
    this.loading = false;
  }

  reactivateSubscription(subscription) {
    const { uuid } = subscription;
    
    this.recurlyService.reactivateSubscription({ uuid })
      .subscribe(
        subscription => {
          this.notificationService.success('Subscription Reactivated');
          this.getSubscriptions();
        },
        error => {
          this.handleError(error);
        });
  }

  selectPlan = (plan) => {
    this.addSubscription({ data: { 
      frequency_code: '1_months',
      budget: plan.unit_amount_in_cents.USD._
    }});
  }

  /*
  editShippingAddress = () => {
    const modalRef = this.modalService.open(ModalShippingAddressFormComponent);
    const address = this.defaultShippingAddress;

    modalRef.componentInstance.address = _.cloneDeep(address);
    modalRef.componentInstance.mode = 'edit';

    modalRef.result.then((form) => {
      const formData = form.shippingForm.value;

      const config = {
        params: formData
      };

      const id = address.id;

      this.addressService.update({ id, config })
        .subscribe(addressUpdate => {
          this.notificationService.success('Shipping Address Updated');

          this.defaultShippingAddress = addressUpdate;

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
  } */

  updateShippingAddress(address) {
    const formData = address;
    const id = address['id'];

    delete formData['id'];

    formData['isDefault'] = true;

    const config = {
      params: formData
    };

    this.addressService.update({ id, config })
      .subscribe(addressUpdate => {
        //this.notificationService.success('Shipping Address Updated');

        //this.defaultShippingAddress = addressUpdate;

        this.getCustomer();

        this.eventTrackingService.trackEvent({
          action: 'Edit Shipping Address Submit',
          category: 'Shipping Address',
          label: 'Edit Shipping Address'
        });
      });
  }

  addSubscription({ data = {} }) {
    const modalRef = this.modalService.open(ModalRecurlySubscriptionFormComponent);

    modalRef.componentInstance.subscription = data;
    modalRef.componentInstance.billingInfo = this.billingInfo;
    modalRef.componentInstance.shippingInfo = this.getDefaultShippingAddress();
    modalRef.componentInstance.shippingAddresses = this.getShippingAddresses();
    modalRef.componentInstance.user = this.currentUser;
    modalRef.componentInstance.mode = 'add';

    modalRef.result.then((form) => {
      const formData = form.recurlySubscriptionForm.value;
      const { plan_code, customer_notes, coupon_code } = formData;
      const account_code = this.currentUser.email;

      if (!this.billingInfo) {
        this.billingInfo = form.billingInfo;
      }

      const data = {
        plan_code,
        currency: 'USD',
        customer_notes,
        account: {
          account_code,
          email: account_code,
          first_name: this.currentUser.firstName,
          last_name: this.currentUser.lastName
        }
      };

      this.recurlyService.createSubscription({ data })
        .subscribe(
          subscription => {
            this.getSubscriptions();
            this.notificationService.success('Subscription Added');

            this.eventTrackingService.trackEvent({
              action: 'Add Subscription Submit',
              category: 'Subscriptions',
              label: 'Add Subscription'
            });

            this.updateShippingAddress(form.shippingInfo);

            if (coupon_code) {
              const redeemData = {
                account_code: this.currentUser.email,
                currency: 'USD',
                subscription_uuid: subscription.subscription.uuid
              };

              this.recurlyService.redeemCoupon({ coupon_code, data: redeemData })
                .subscribe(
                  coupon => {
                    this.notificationService.success('Subscription Coupon Redeemed');

                    this.eventTrackingService.trackEvent({
                      action: 'Add Subscription Coupon Submit',
                      category: 'Subscriptions',
                      label: 'Add Subscription Coupon'
                    });

                    this.cookiesService.remove('promoCode');
                    this.router.navigate(['/account', 'subscriptions', subscription.subscription.uuid, 'confirmation']);
                  },
                  error => {
                    
                  });
            } else {
              this.router.navigate(['/account', 'subscriptions', subscription.subscription.uuid, 'confirmation']);
            }

          },
          error => {
            this.handleError(error);
          }); 

    }, (reason) => {});

    this.eventTrackingService.trackEvent({
      action: 'Add Subscription Click',
      category: 'Subscriptions',
      label: 'Add Subscription'
    });
  }

  editSubscription(subscription) {
    const modalRef = this.modalService.open(ModalRecurlySubscriptionFormComponent);

    const { uuid } = subscription;

    const data = {
      plan_code: subscription.plan.plan_code,
      uuid,
      customer_notes: subscription.customer_notes
    };

    modalRef.componentInstance.subscription = data;
    modalRef.componentInstance.billingInfo = this.billingInfo;
    modalRef.componentInstance.shippingInfo = this.getDefaultShippingAddress();
    modalRef.componentInstance.shippingAddresses = this.getShippingAddresses();
    modalRef.componentInstance.user = this.currentUser;
    modalRef.componentInstance.mode = 'edit';

    /*
    this.recurlyService.getSubscriptionRedemptions({ uuid })
      .subscribe(
        redemptions => {
          console.log(redemptions);
        },
        error => {
        });
        */

    modalRef.result.then((form) => {
      const formData = form.recurlySubscriptionForm.value;
      const { uuid, customer_notes } = formData;

      const data = _.pick(formData,
        'plan_code'
      );


      this.recurlyService.updateSubscription({ uuid, data })
        .subscribe(
          subscription => {
            if (customer_notes) {

              const notesData = {
                customer_notes
              };

              this.eventTrackingService.trackEvent({
                action: 'Edit Subscription Submit',
                category: 'Subscriptions',
                label: 'Edit Subscription'
              });

              this.recurlyService.updateSubscriptionNotes({ uuid, data: notesData })
                .subscribe(
                  subscription => {
                    this.notificationService.success('Subscription Updated');
                    this.getSubscriptions();

                    this.eventTrackingService.trackEvent({
                      action: 'Edit Subscription Submit',
                      category: 'Subscriptions',
                      label: 'Edit Subscription Notes'
                    });

                    this.updateShippingAddress(form.shippingInfo);
                  },
                  error => {
                    this.handleError(error);
                  });

            } else {
              this.notificationService.success('Subscription Updated');
              this.getSubscriptions();
              this.updateShippingAddress(form.shippingInfo);
            }
          },
          error => {
            this.handleError(error);
          });

    }, (reason) => {});

    this.eventTrackingService.trackEvent({
      action: 'Edit Subscription Click',
      category: 'Subscriptions',
      label: 'Edit Subscription'
    });
  }

  removeSubscription(subscription) {
    const { uuid } = subscription;
    const modalRef = this.modalService.open(ModalSimpleComponent);

    const template = '<p>Are you sure you want to cancel this subscription?</p>';

    modalRef.componentInstance.config = {
      title: 'Cancel Subscription',
      submitLabel: 'Cancel Subscription'
    };

    modalRef.componentInstance.content = template;

    modalRef.result.then((form) => {
      this.recurlyService.cancelSubscription({ uuid })
        .subscribe(
          subscription => {
            this.getSubscriptions();
            this.notificationService.success('Subscription Canceled');

            this.eventTrackingService.trackEvent({
              action: 'Remove Subscription Submit',
              category: 'Subscriptions',
              label: 'Remove Subscription'
            });
          },
          error => {
            this.handleError(error);
          });
    }, (reason) => {});

    this.eventTrackingService.trackEvent({
      action: 'Remove Subscription Click',
      category: 'Subscriptions',
      label: 'Remove Subscription'
    });
  }
}
