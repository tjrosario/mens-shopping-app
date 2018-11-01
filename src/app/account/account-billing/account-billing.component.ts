import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as _ from 'lodash';

import { NotificationService } from '../../services/notification.service';
import { User } from '../../models/user.model';
import { CreditCard } from '../../models/credit-card.model';
import { ModalCreditCardFormComponent } from '../../modals/modal-credit-card-form/modal-credit-card-form.component';
import { ModalSimpleComponent } from '../../modals/modal-simple/modal-simple.component';
import { UtilsService } from '../../services/utils.service';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';
import { RecurlyService } from '../../services/recurly.service';
import { CREDIT_CARDS } from '../../data/credit-cards';
import { EventTrackingService } from '../../services/event-tracking.service';

@Component({
  selector: 'app-account-billing',
  templateUrl: './account-billing.component.html',
  styleUrls: ['./account-billing.component.scss']
})
export class AccountBillingComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private modalService: NgbModal,
    private utilsService: UtilsService,
    private customerService: CustomerService,
    private authService: AuthService,
    private recurlyService: RecurlyService,
    private eventTrackingService: EventTrackingService
  ) { }

  currentUser: User;
  billingInfo = {};
  cards: CreditCard[] = [];
  selectedCreditCardBrand = {};
  changingBillingInfo = false;
  loadingPayment = false;

  loading = false;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
        this.getBillingInfo();
      });
  }

  getBillingInfo() {
    const account_code = this.currentUser.email;

    this.loading = true;
    this.recurlyService.getAccountBillingInfo({ account_code })
      .subscribe(
        billingInfo => {
          this.billingInfo = billingInfo.billing_info;
          this.setSelectedCard(this.billingInfo);
          this.loading = false;
        },
        error => {
          this.loading = false;
        });
  }

  setSelectedCard(billingInfo) {
    this.selectedCreditCardBrand = _.find(CREDIT_CARDS, { brand: billingInfo.card_type });
  }

  updateBillingInfo() {
    this.changingBillingInfo = true;

    this.eventTrackingService.trackEvent({
      action: 'Edit Billing Info Click',
      category: 'Billing',
      label: 'Edit Billing Info'
    });
  }

  updatePaymentMethod(err, token) {
    this.loadingPayment = true;

    this.eventTrackingService.trackEvent({
      action: 'Edit Billing Info Submit',
      category: 'Billing',
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
      category: 'Billing',
      label: 'Add Account',
      non_interaction: true
    });

    this.recurlyService.createAccount({ data })
      .subscribe(
        account => {
          opts.callback();
        });
  }

  cancelUpdatePaymentMethod() {
    this.changingBillingInfo = false;
  }

  handleError(error) {
    this.notificationService.alert(error);
    this.loading = false;
  }
}
