import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CookiesService } from '@ngx-utils/cookies';
import { NgForm } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

import { NotificationService } from '../../services/notification.service';
import { OrderService } from '../../services/order.service';
import { CustomerService } from '../../services/customer.service';
import { User } from '../../models/user.model';
import { Order } from '../../models/order.model';
import { ProductNeed } from '../../models/product-need.model';
import { Address } from '../../models/address.model';
import { BoxService } from '../../services/box.service';
import { BoxItem } from '../../models/box-item.model';
import { Box } from '../../models/box.model';
import { Globals } from '../../config/globals';
import { AddressService } from '../../services/address.service';
import { SubscriptionService } from '../../services/subscription.service';
import { FREQUENCIES } from '../../data/subscriptions';
import { Frequency } from '../../models/frequency.model';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { CreditCard } from '../../models/credit-card.model';
import { CREDIT_CARDS } from '../../data/credit-cards';
import { RecurlyService } from '../../services/recurly.service';

import { ModalShippingAddressFormComponent } from '../../modals/modal-shipping-address-form/modal-shipping-address-form.component';

//import { CreditCardFormComponent } from '../../credit-card-form/credit-card-form.component';
import { RecurlyFormComponent } from '../../recurly-form/recurly-form.component';
import { ShippingAddressFormComponent } from '../../shipping-address-form/shipping-address-form.component';

declare const recurly: any;

@Component({
  selector: 'app-checkout-finalize',
  templateUrl: './checkout-finalize.component.html',
  styleUrls: ['./checkout-finalize.component.scss']
})
export class CheckoutFinalizeComponent implements OnInit {

  //@ViewChild(CreditCardFormComponent) creditCardForm: CreditCardFormComponent;
  @ViewChild(RecurlyFormComponent) recurlyForm: RecurlyFormComponent;
  @ViewChild(ShippingAddressFormComponent) shippingAddressForm: ShippingAddressFormComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private notificationService: NotificationService,
    private orderService: OrderService,
    private customerService: CustomerService,
    private boxService: BoxService,
    private addressService: AddressService,
    private subscriptionService: SubscriptionService,
    private globals: Globals,
    private utilsService: UtilsService,
    private authService: AuthService,
    private cookiesService: CookiesService,
    private recurlyService: RecurlyService,
    private modalService: NgbModal
  ) { }

  assetUrl = this.globals.assetUrl;
  loading = false;
  addressesLoading = false;
  cardsLoading = false;
  promoCodeLoading = false;

  currentUser: User;
  order: Order;
  productNeeds: ProductNeed[];
  addresses: Address[] = [];
  selectedAddress: null;
  selectedAddressData: Address = {};
  cards: CreditCard[] = [];
  selectedCard: null;
  selectedCardData: CreditCard = {};
  selectedCreditCardBrand = {};
  creditCardMode = 'add';
  boxItems: BoxItem[];
  selectedBox: Box;
  //subscriptionFrequencies: Frequency[];
  //subscriptionFrequency: Frequency;
  showSpecialInstructions = false;
  addSubscription = true;
  requiresPayment = true;


  allPlans = null;
  availablePlans = null;
  subscriptionPlan = null;
  loadingPayment = false;
  billingInfo = {};
  billingInfoLoading = false;
  changingBillingInfo = false;
  subscriptionsLoading = false;
  subscriptions = null;
  addressLoading = false;
  changingShippingAddress = false;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
        this.getOrder();
        this.getCustomer();
      });
  }

  /*
  selectCard(cardId) {
    this.selectedCard = cardId;
    const found = _.find(this.cards, { id: this.selectedCard }) || {};

    this.selectedCardData = this.utilsService.getCreditCardData(found);

    if (found.brand) {
      this.selectedCreditCardBrand = _.find(CREDIT_CARDS, { brand: found.brand });
    }
  } */

  submitPromoCode(formValue) {
    const id = this.order.id;
    const config = {
      params: {
        promoCode: formValue.promoCode
      }
    };

    this.promoCodeLoading = true;

    this.orderService.applyPromo({ id, config })
      .subscribe(order => {
        if (order) {
          this.order = order;
          this.notificationService.success(`${formValue.promoCode} promo added!`);
        }
        this.promoCodeLoading = false;
      });
  }

  handleError(error) {
    this.notificationService.alert(error);
    this.loading = false;
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

    this.recurlyService.createAccount({ data })
      .subscribe(
        account => {
          opts.callback();
        });
  }

  updateBillingInfo() {
    this.changingBillingInfo = true;
  }

  updatePaymentMethod(err, token) {
    this.loadingPayment = true;

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
                  this.setSelectedCard(this.billingInfo);
                  this.loadingPayment = false;
                  this.changingBillingInfo = false;
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

  cancelUpdatePaymentMethod() {
    this.changingBillingInfo = false;
  }

  setSelectedCard(billingInfo) {
    this.selectedCreditCardBrand = _.find(CREDIT_CARDS, { brand: billingInfo.card_type });
  }

  getBillingInfo() {
    const account_code = this.currentUser.email;

    this.billingInfoLoading = true;
    this.recurlyService.getAccountBillingInfo({ account_code })
      .subscribe(
        billingInfo => {
          this.billingInfo = billingInfo.billing_info;
          this.setSelectedCard(this.billingInfo);
          this.billingInfoLoading = false;
        },
        error => {
          this.billingInfoLoading = false;
        });
  }

  getSubscriptions() {
    const account_code = this.currentUser.email;

    this.subscriptionsLoading = true;
    this.recurlyService.getAccountSubscriptions({ account_code })
      .subscribe(
        subscriptions => {
          this.subscriptions = subscriptions.subscriptions;
          this.subscriptionsLoading = false;
        },
        error => {
          this.subscriptionsLoading = false;
        });
  }

  confirmOrder() {
    const isFormValid = this.checkoutFormValid();
    let data = {};

    if (isFormValid) {
      this.loading = true;

      // get shipping address data
      if (this.selectedAddressData.id) {
        data['shippingAddress'] = this.selectedAddressData.id;
        data = this.getOrderParams(data);
        this.completeOrder(data);
      } else {
        this.selectedAddressData['customer.id'] = this.currentUser.id;

        const config = {
          params: this.selectedAddressData
        };

        this.addressService.create({ config })
          .subscribe(address => {
            data['shippingAddress'] = address.id;
            data = this.getOrderParams(data);
            this.completeOrder(data);
          });
      }
    }
  }

  completeOrder(orderData) {
    const account_code = this.currentUser.email;
    const { plan_code } = this.subscriptionPlan;

    // set up subscription
    const data = {
      plan_code,
      currency: 'USD',
      account: {
        account_code,
        email: account_code,
        first_name: this.currentUser.firstName,
        last_name: this.currentUser.lastName
      }
    };

    const config = {
      params: orderData
    };

    this.orderService.update({ id: this.order.id, config })
      .subscribe(order => {
        this.recurlyService.createSubscription({ data })
          .subscribe(
            subscription => {
              this.goToConfirmation();
            },
            error => {
              this.handleError(error);
              this.loading = false;
            });
      },
      error => {
        this.handleError(error);
        this.loading = false;
      });
  }


  goToConfirmation() {
    this.router.navigate(['/place-order', this.order.orderNumber, 'confirmation']);
    this.loading = false;
  }

  getOrderParams(input) {
    const id = this.order.id;
    const params = {
      specialInstructions: this.order.specialInstructions,
      promoCode: this.order.promoCode,
      isPreviewRequired: true
    };

    return _.merge(params, input);
  }

  getOrderTitle() {
    return `Order-${this.order.orderNumber} (Confirmation)`;
  }

  checkoutFormValid() {
    if (!this.billingInfo || !this.selectedAddressData || !this.subscriptionPlan) { return false; }

    let billingValid = false;
    let shippingValid = false;

    if (this.selectedAddressData.id) {
      shippingValid = true;
    }

    if (this.billingInfo) {
      billingValid = true;
    }

    return shippingValid && billingValid;
  }

  toggleSpecialInstructions() {
    this.showSpecialInstructions = !this.showSpecialInstructions;
  }

  getBoxItems() {
    this.boxService.getBoxes().
      subscribe(boxItems => {
        this.boxItems = boxItems;
        const boxItemsList = this.boxItems[0].list;
        const found  = _.find(boxItemsList, { price: this.order.budget });

        this.selectedBox = found || null;
      });
  }

  getAvailablePlans(plans) {
    const available = [];

    _.each(plans, plan => {
      const split = plan.plan_code.split('_');
      const budget = parseInt(split[0], 10);

      if (budget === this.order.budget) {
        available.push(plan);
      }
    });

    return available;
  }

  getPlans() {
    this.recurlyService.getPlans({})
      .subscribe(plans => {
        this.allPlans = plans.plans.plan;
        this.availablePlans = this.getAvailablePlans(this.allPlans);
      });
  }

  getOrder() {
    const orderNumber = this.route.snapshot.paramMap.get('orderNumber');

    const config = {
      params: {
        orderNumber,
        expand: 'orderItems/product,productNeeds/productCategory'
      }
    };

    this.orderService.findByOrderNumber({ config })
      .subscribe(order => {
        if (!order) { this.router.navigate(['/home']); }

        if (order.status === 'initialized') {
          this.order = order;
          this.productNeeds = order.productNeeds;
          this.getBoxItems();
          //this.getSubscriptionFrequencies();
          this.getBillingInfo();
          //this.getSubscriptions();
          this.getPlans();

          const promoCode = this.cookiesService.get('promoCode');
          if (promoCode) {
            this.submitPromoCode({ promoCode });
          }

          this.requiresPayment = order.invoiceValue > 0;
        } else {
          this.router.navigate(['/home']);
        }
      });
  }

  getCustomer() {
    const config = {
      params: {
        //'customer.id': this.currentUser.id,
        expand: 'addresses,subscriptions'
      }
    };

    this.addressesLoading = true;

    this.customerService.get({ config })
      .subscribe(user => {
        this.currentUser = user;
        this.getShipping();
        //this.getBilling();
      });
  }

  selectAddress(addressId) {
    this.selectedAddress = addressId;
    this.selectedAddressData = _.find(this.addresses, { id: this.selectedAddress }) || {};
    this.selectedAddressData.type = 'shipping';

    if (!addressId) {
      this.selectedAddressData['addresseeEmail'] = this.currentUser.email;
    }
  }

  selectShippingAddress(address) {
    this.selectAddress(address.id);
    this.changingShippingAddress = false;
  }

  updateShippingInfo() {
    this.changingShippingAddress = true;
  }

  addShippingAddress() {
    const modalRef = this.modalService.open(ModalShippingAddressFormComponent);
    modalRef.componentInstance.address = {};
    modalRef.componentInstance.mode = 'add';

    modalRef.result.then((form) => {
      const formData = form.shippingForm.value;
      formData['customer.id'] = this.currentUser.id;
      formData['addresseeEmail'] = this.currentUser.email;
      formData['type'] = 'shipping';

      const config = {
        params: formData
      };

      this.addressService.create({ config })
        .subscribe(address => {
          this.currentUser.addresses.push(address);
          this.getShipping();
        });

    }, (reason) => {});
  }

  getShipping() {
    const addresses = this.currentUser.addresses;
    const shippingAddresses = _.filter(addresses, address => {
      return address.type === 'shipping';
    });

    if (shippingAddresses.length > 0) {
      this.addresses = shippingAddresses;

      if (this.addresses.length === 1) {
        this.addresses[0].isDefault = true;
      }

      const selected = _.first(_.filter(this.addresses, address => {
        return address.isDefault;
      }));

      this.selectAddress(selected.id);
    } else {
      this.selectAddress(null);
      this.selectedAddressData.type = 'shipping';
    }

    this.addressesLoading = false;
  }
}
