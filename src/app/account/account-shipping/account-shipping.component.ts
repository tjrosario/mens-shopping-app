import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

import { AddressService } from '../../services/address.service';
import { NotificationService } from '../../services/notification.service';
import { User } from '../../models/user.model';
import { Address } from '../../models/address.model';
import { ModalShippingAddressFormComponent } from '../../modals/modal-shipping-address-form/modal-shipping-address-form.component';
import { ModalSimpleComponent } from '../../modals/modal-simple/modal-simple.component';
import { UtilsService } from '../../services/utils.service';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';
import { EventTrackingService } from '../../services/event-tracking.service';

@Component({
  selector: 'app-account-shipping',
  templateUrl: './account-shipping.component.html',
  styleUrls: ['./account-shipping.component.scss']
})
export class AccountShippingComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressService,
    private notificationService: NotificationService,
    private modalService: NgbModal,
    private utilsService: UtilsService,
    private customerService: CustomerService,
    private authService: AuthService,
    private eventTrackingService: EventTrackingService
  ) { }

  currentUser: User;
  addresses: Address[] = [];

  loading = false;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
        this.check();
      });
  }

  addAddress() {
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
          this.notificationService.success('Shipping Address Added');
          this.getCustomer({
            callback: () => {
              this.getShipping();
            }
          });
        });
    }, (reason) => {});

    this.eventTrackingService.trackEvent({
      action: 'Add Shipping Address Click',
      category: 'Shipping Address',
      label: 'Add Shipping Address'
    });
  }

  editAddress(address) {
    const modalRef = this.modalService.open(ModalShippingAddressFormComponent);
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
          this.getCustomer({
            callback: () => {
              this.getShipping();

              this.eventTrackingService.trackEvent({
                action: 'Edit Shipping Address Submit',
                category: 'Shipping Address',
                label: 'Edit Shipping Address'
              });
            }
          });
        });
    }, (reason) => {});

    this.eventTrackingService.trackEvent({
      action: 'Edit Shipping Address Click',
      category: 'Shipping Address',
      label: 'Edit Shipping Address'
    });
  }

  removeAddress(address) {
    const id = address.id;
    const modalRef = this.modalService.open(ModalSimpleComponent);

    const template = '<p>Are you sure?</p>';

    modalRef.componentInstance.config = {
      title: 'Remove Shipping Address',
      submitLabel: 'Remove'
    };

    modalRef.componentInstance.content = template;

    modalRef.result.then(() => {
      this.addressService.delete({ id })
        .subscribe(addressDelete => {
          this.notificationService.success('Shipping Address Removed');
          this.getCustomer({
            callback: () => {
              this.getShipping();

              this.eventTrackingService.trackEvent({
                action: 'Remove Shipping Address Submit',
                category: 'Shipping Address',
                label: 'Remove Shipping Address'
              });
            }
          });
        });

    }, (reason) => {});

    this.eventTrackingService.trackEvent({
      action: 'Remove Shipping Address Click',
      category: 'Shipping Address',
      label: 'Remove Shipping Address'
    });
  }

  check() {
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
    }
  }
}
