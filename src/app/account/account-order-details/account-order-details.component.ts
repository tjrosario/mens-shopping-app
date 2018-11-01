import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

import { Order } from '../../models/order.model';
import { User } from '../../models/user.model';
import { Payment } from '../../models/payment.model';
import { Address } from '../../models/address.model';
import { Globals } from '../../config/globals';
import { BoxService } from '../../services/box.service';
import { CustomerService } from '../../services/customer.service';
import { Box } from '../../models/box.model';
import { OrderService } from '../../services/order.service';
import { AddressService } from '../../services/address.service';
import { StripeService } from '../../services/stripe.service';
import { AuthService } from '../../services/auth.service';
import { OrderReason } from '../../models/order-reason.model';
import { UtilsService } from '../../services/utils.service';
import { ModalSimpleComponent } from '../../modals/modal-simple/modal-simple.component';
import { ModalOrderItemRejectFormComponent } from '../../modals/modal-order-item-reject-form/modal-order-item-reject-form.component';
import { ModalOrderItemReturnFormComponent } from '../../modals/modal-order-item-return-form/modal-order-item-return-form.component';
import { ShippingAddressFormComponent } from '../../shipping-address-form/shipping-address-form.component';

@Component({
  selector: 'app-account-order-details',
  templateUrl: './account-order-details.component.html',
  styleUrls: ['./account-order-details.component.scss']
})
export class AccountOrderDetailsComponent implements OnInit {

  @ViewChild(ShippingAddressFormComponent) shippingAddressForm: ShippingAddressFormComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private authService: AuthService,
    private boxService: BoxService,
    private orderService: OrderService,
    private addressService: AddressService,
    private stripeService: StripeService,
    private utilsService: UtilsService,
    private globals: Globals,
    private modalService: NgbModal
  ) { }

  assetUrl = this.globals.assetUrl;
  loading = false;
  addressesLoading = false;
  orderLoading = false;
  acceptLoading = false;

  currentUser: User;
  order: Order;

  rejectReasons: OrderReason[];
  returnReasons: OrderReason[];

  addresses: Address[] = [];
  selectedAddress: null;
  selectedAddressData: Address = {};

  payment: Payment;
  paymentInfo: {};

  numRejected: number;
  numReturned: number;
  allRejected = false;

  showFeedback = false;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
        this.getCustomer();
        this.getOrderReasons({
          callback: () => {
            this.getOrder();
          }
        });
      });
  }

  toggleFeedback() {
    this.showFeedback = !this.showFeedback;
  }

  orderFormValid() {
    if (!this.shippingAddressForm || !this.order) {
      return false;
    }

    const shippingValid = this.shippingAddressForm.shippingForm.valid;

    return shippingValid;
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
      });
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
      this.selectedAddressData.type = 'shipping';
    }

    this.addressesLoading = false;
  }

  selectAddress(addressId) {
    this.selectedAddress = addressId;
    this.selectedAddressData = _.find(this.addresses, { id: this.selectedAddress }) || {};
    this.selectedAddressData.type = 'shipping';
  }

  showDropship() {
    const modalRef = this.modalService.open(ModalSimpleComponent);

    const template = `<p>This is a drop-shipped item that will be delivered separately from one of our trusted vendors.</p>`;

    modalRef.componentInstance.config = {
      title: 'Item Ships Separately',
      submitLabel: 'Ok'
    };

    modalRef.componentInstance.content = template; 
  }

  viewProduct(orderItem) {
    const modalRef = this.modalService.open(ModalSimpleComponent);

    const template = `<img src="${orderItem.product.imageUrl}">`;

    modalRef.componentInstance.config = {
      title: orderItem.product.name,
      submitLabel: 'Ok'
    };

    modalRef.componentInstance.content = template;
  }

  setRejectReason(orderItem, rejectReason) {
    const found = _.find(this.rejectReasons, { value: rejectReason });
    if (found) {
      orderItem.rejectReasonsPretty = found.text;
    }
  }

  setReturnReason(orderItem, returnReason) {
    const found = _.find(this.returnReasons, { value: returnReason });
    if (found) {
      orderItem.returnReasonsPretty = found.text;
    }
  }

  rejectOrderItem(orderItem) {
    const modalRef = this.modalService.open(ModalOrderItemRejectFormComponent);
    modalRef.componentInstance.orderItem = orderItem;

    modalRef.result.then((form) => {
      const formData = form.orderItemRejectForm.value;
      formData['comments'] = formData['comments'] || '';

      const id = orderItem.id;

      const config = {
        params: formData
      };

      this.orderService.rejectItem({ id, config })
        .subscribe(order => {
          orderItem.rejected = true;
          this.setRejectReason(orderItem, formData.rejectReasons);
          this.updatePricing(order);
        });
    }, (reason) => {});
  }

  undoRejectOrderItem(orderItem) {
    const id = orderItem.id;

    this.orderService.undoRejectItem({ id })
      .subscribe(order => {
        orderItem.rejected = false;
        this.updatePricing(order);
      });
  }

  returnOrderItem(orderItem) {
    const modalRef = this.modalService.open(ModalOrderItemReturnFormComponent);
    modalRef.componentInstance.orderItem = orderItem;

    modalRef.result.then((form) => {
      const formData = form.orderItemReturnForm.value;
      formData['comments'] = formData['comments'] || '';

      const id = orderItem.id;

      const config = {
        params: formData
      };

      this.orderService.returnItem({ id, config })
        .subscribe(order => {
          orderItem.returned = true;
          orderItem.markedForReturn = true;
          this.setReturnReason(orderItem, formData.returnReasons);
          this.updatePricing(order);
        });
    }, (reason) => {});
  }

  undoReturnOrderItem(orderItem) {
    const id = orderItem.id;

    this.orderService.undoReturnItem({ id })
      .subscribe(order => {
        orderItem.returned = false;
        orderItem.markedForReturn = false;
        this.updatePricing(order);
      });
  }

  updatePricing(order) {
    this.order.cashRefund = order.cashRefund;
    this.order.cost = order.cost;
    this.order.discount = order.discount;
    this.order.giftCardCreditRefund = order.giftCardCreditRefund;
    this.order.grossPrice = order.grossPrice;
    this.order.invoiceValue = order.invoiceValue;
    this.order.netPrice = order.netPrice;
    this.order.retailValue = order.retailValue;
    this.order.shippedValue = order.shippedValue;
    this.order.totalCreditRefund = order.totalCreditRefund;
    this.order.totalRefund = order.totalRefund;
    this.order.value = order.value;

    this.getOrderItemStatus();
  }

  getOrder() {
    const orderNumber = this.route.snapshot.paramMap.get('orderNumber');

    const config = {
      params: {
        orderNumber,
        expand: 'orderItems/product,productNeeds/productCategory,refunds,payments,shipments'
      }
    };

    this.orderLoading = true;

    this.orderService.findByOrderNumber({ config })
      .subscribe(order => {
        if (order) {
          this.order = this.prepareOrderData(order);
          this.getOrderItemStatus();
          this.getPaymentInfo(this.order);
          this.orderLoading = false;
        } else {
          this.router.navigate(['/account', 'orders']);
        }
      },
      error => {
        this.router.navigate(['/account', 'orders']);
      });
  }

  getPaymentInfo(order) {
    /*
    const payments = order.payments;

    if (payments.length > 0) {
      const finalizationPayment = _.filter(payments, payment => payment.comments === 'Finalization Payment')[0];

      
      this.payment = _.filter(payments, payment => payment.comments === 'Acceptance Payment')[0];

      if (this.payment['paymentMethod'] === 'stripe') {
        const chargeId = this.payment['transactionId'];
        this.stripeService.getCharge({ chargeId })
          .subscribe(stripeCharge => {
            if (stripeCharge.error) {
              return false;
            } else {
              const { source } = stripeCharge;
              this.paymentInfo = source;
              this.paymentInfo['logo'] = this.utilsService.getCreditCardLogo(source.brand);
            }
          });
      } else if (this.payment['paymentMethod'] === 'paypal') {
        this.paymentInfo = this.payment;
        this.paymentInfo['logo'] = 'paypal';
      } 
    }*/
  }

  acceptOrderPreview() {
    const valid = this.orderFormValid();

    if (valid) {
      this.acceptLoading = true;
      const data = {
        transactionId: null,
        paymentAmount: 0,
        paymentMethod: 'stripe'
      };
      this.startAcceptOrder(data);
    }
  }

  startAcceptOrder(data) {
    if (this.selectedAddressData.id) {
      data.shippingAddress = this.selectedAddressData.id;
      this.completeAcceptOrder(data);
    } else {
      this.selectedAddressData['customer.id'] = this.currentUser.id;

      const config = {
          params: this.selectedAddressData
      };

      this.addressService.create({ config })
        .subscribe(address => {
          data.shippingAddress = address.id;
          this.completeAcceptOrder(data);
        });
    }
  }

  completeAcceptOrder(data) {
    const id = this.order.id;

    const config = {
        params: data
    };

    this.orderService.accept({ id, config })
      .subscribe(order => {
        this.acceptLoading = false;

        if (this.utilsService.isBrowser()) {
          window.location.reload();
        }
      });
  }

  rejectOrderPreview() {
    const modalRef = this.modalService.open(ModalSimpleComponent);
    const template = '<p>Not satisifed with your preview?  No problem.  In order for us to provide a more accurate selection of items please make sure you provide any additional feedback on the items you rejected.</p>';

    modalRef.componentInstance.config = {
      title: 'Send me another preview',
      submitLabel: 'Send another preview',
      cancelLabel: 'Cancel'
    };

    modalRef.componentInstance.content = template;

    modalRef.result.then((form) => {
      const id = this.order.id;

      this.orderService.reject({ id })
        .subscribe(order => {
          if (this.utilsService.isBrowser()) {
            window.location.reload();
          }
        });

    }, (reason) => {});
  }

  cancelOrder() {
    const modalRef = this.modalService.open(ModalSimpleComponent);
    const template = '<p>Are you sure you want to do that??  We recommend you reject items and let us know why they are not a match.  We\'ll happily send you another preview.</p>';

    modalRef.componentInstance.config = {
      title: 'Cancel Order',
      submitLabel: 'Confirm Cancel',
      cancelLabel: 'Nevermind'
    };

    modalRef.componentInstance.content = template;

    modalRef.result.then((form) => {
      const id = this.order.id;

      this.orderService.cancel({ id })
        .subscribe(order => {
          if (this.utilsService.isBrowser()) {
            window.location.reload();
          }
        });

    }, (reason) => {});
  }

  getOrderItemStatus() {
    const orderItems = this.order.orderItems;
    const rejected = _.filter(orderItems, { rejected: true });
    const returned = _.filter(orderItems, { returned: true });
    this.numRejected = rejected.length;
    this.numReturned = returned.length;
    this.allRejected = this.numRejected === orderItems.length;
  }

  getOrderReasons(opts?) {
    opts = opts || {};
    opts.callback = opts.callback || (() => {});

    // TODO: queue these up
    this.orderService.getRejectReasons()
      .subscribe(rejectReasons => {
        this.rejectReasons = rejectReasons;


        this.orderService.getReturnReasons()
          .subscribe(returnReasons => {
            this.returnReasons = returnReasons;
            opts.callback();
          });
      });
  }

  prepareOrderData(data) {
    const order = _.cloneDeep(data);

    order.matches = [];
    order.orderItems = _.reject(order.orderItems, item => item.rejected && item.rejectedPreviewNumber !== order.previewNumber);
    order.orderItems.sort(this.utilsService.sortByDateCreated);

    _.each(order.productNeeds, (need, i) => {
      order.matches[i] = {};
      order.matches[i].category = need.productCategory.name;
      order.matches[i].orderItems = [];
      order.matches[i].virtualOrderItems = [];
    });

    _.each(order.orderItems, orderItem => {
      const category = orderItem.product.xProductCategory;
      const found = _.find(order.matches, { category });
      orderItem.rejectedReasons = this.rejectReasons;
      orderItem.returnedReasons = this.returnReasons;
      orderItem.isCollapsed = true;

      if (orderItem.rejected) {
        /*
        _.each(orderItem.rejectedReasons, reason => {
          const f = _.first(_.filter(orderItem.rejectReasons, el => {
            return el === key;
          }));

          if (f) {
            orderItem.rejectedReasons[key].selected = true;
            console.log(f);
          }
        });*/

        this.setRejectReason(orderItem, orderItem.rejectReasons[0]);
      }

      if (orderItem.returned) {
        /*
        _.each(orderItem.returnedReasons, (val, key) => {
          const f = _.first(_.filter(orderItem.returnReasons, el => {
            return el === key;
          }));

          if (f) {
            orderItem.returnedReasons[key].selected = true;
          }
        });*/

        this.setReturnReason(orderItem, orderItem.returnReasons[0]);
      }

      if (found) {
        found.orderItems.push(orderItem);
      }
    });

    return order;
  }
}
