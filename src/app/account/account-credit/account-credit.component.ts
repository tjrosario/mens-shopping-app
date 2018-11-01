import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Globals } from '../../config/globals';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { CustomerService } from '../../services/customer.service';
import { NotificationService } from '../../services/notification.service';
import { RecurlyService } from '../../services/recurly.service';
import { EventTrackingService } from '../../services/event-tracking.service';

@Component({
  selector: 'app-account-credit',
  templateUrl: './account-credit.component.html',
  styleUrls: ['./account-credit.component.scss']
})
export class AccountCreditComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private globals: Globals,
    private authService: AuthService,
    private customerService: CustomerService,
    private notificationService: NotificationService,
    private recurlyService: RecurlyService,
    private eventTrackingService: EventTrackingService
  ) { }

  assetUrl = this.globals.assetUrl;

  currentUser: User;
  redemptions = [];

  loading = false;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
        this.getRedemptions();
      });
  }

  getRedemptions() {
    const account_code = this.currentUser.email;

    this.recurlyService.getAccountRedemptions({ account_code })
      .subscribe(
        redemptions => {
          const reds = redemptions.redemption || [];

          if (!(reds instanceof Array)) {
            this.redemptions = [reds]
          } else {
            this.redemptions = reds;
          }
        },
        error => {
        });
  }

  submitCoupon(value) {
    const { coupon_code } = value;

    const data = {
      account_code: this.currentUser.email,
      currency: 'USD'
    };

    this.recurlyService.redeemCoupon({ coupon_code, data })
      .subscribe(
        coupon => {
          this.notificationService.success('Coupon Redeemed');
          this.getRedemptions();

          this.eventTrackingService.trackEvent({
            action: 'Add Coupon Submit',
            category: 'Coupons',
            label: 'Add Coupon',
            value: coupon_code
          });
        },
        error => {
          
        });
  }

  submitGiftCard(value) {

    /*
    const config = {
      params: {
        //'customer.id': this.currentUser.id,
        code: value.code
      }
    };

    this.loading = true;

    this.customerService.redeemGiftCard({ config })
      .subscribe(user => {
        if (user && user['message']) {
          this.notificationService.success(`$${user['message']} Gift Card Redeemed!`);

          const configGet = {
            params: {
              //'customer.id': this.currentUser.id
            }
          };

          this.customerService.get({ config: configGet })
            .subscribe(userGet => {
              if (userGet) {
                this.authService.setCurrentUser(userGet);
                this.currentUser = userGet;
              }
            });
        }

        this.loading = false;
      });

      */
  }

  handleError(error) {
    this.notificationService.alert(error);
    this.loading = false;
  }

}
