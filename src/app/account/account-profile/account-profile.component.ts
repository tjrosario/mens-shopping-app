import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreditCardValidator } from 'angular-cc-library';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

import * as _ from 'lodash';

import { User } from '../../models/user.model';
import { Globals } from '../../config/globals';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { environment } from '../../../environments/environment';
import { UserProfileFormComponent } from '../../user-profile-form/user-profile-form.component';
import { EventTrackingService } from '../../services/event-tracking.service';


@Component({
  selector: 'app-account-profile',
  templateUrl: './account-profile.component.html',
  styleUrls: ['./account-profile.component.scss']
})
export class AccountProfileComponent implements OnInit {

  @ViewChild(UserProfileFormComponent) userProfileForm: UserProfileFormComponent;

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private fbService: FacebookService,
    private eventTrackingService: EventTrackingService
  ) {
    let initParams: InitParams = environment.facebook.app;

    this.fbService.init(initParams);
  }

  currentUser: User;

  loading = false;
  fbLoading = false;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
      });
  }

  onSubmit() {
    const params = _.merge(this.userProfileForm.profileForm.value, {
      //'customer.id': this.currentUser.id,
    });

    const config = {
      params
    };

    this.loading = true;

    this.eventTrackingService.trackEvent({
      action: 'Update Profile Click',
      category: 'Account',
      label: 'Update Profile'
    });

    this.customerService.update({ config })
      .subscribe(user => {
        this.notificationService.success('Profile updated');
        this.authService.setCurrentUser(user);
        this.currentUser = user;
        this.loading = false;

        this.eventTrackingService.trackEvent({
          action: 'Update Profile Submit',
          category: 'Account',
          label: 'Update Profile'
        });
      });
  }

  facebookLogin() {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'email'
    };
    
    this.fbService.login(loginOptions)
      .then((response: LoginResponse) => {
        if (response.authResponse) {
          this.fbLoading = true;

          this.fbService.api('/me?fields=id,first_name,last_name,email')
            .then((res: any) => {
              if (res.id && res.email) {
                if (res.email === this.currentUser.email) {

                  const params = {
                    facebookId: res.id
                  };

                  const config = {
                    params
                  };

                  this.customerService.update({ config })
                    .subscribe(user => {
                      this.notificationService.success('Your Facebook Account is now linked!');
                      this.authService.setCurrentUser(user);
                      this.currentUser = user;
                      this.fbLoading = false;

                      this.eventTrackingService.trackEvent({
                        action: 'Link Facebook Submit',
                        category: 'Account',
                        label: 'Link Facebook'
                      });
                    });

                } else {
                  const msg = `The email address associated with this Facebook account does not match the email address of your ThreadLab account.`;
                  this.notificationService.info(msg);
                  this.fbLoading = false;
                }
              }
            });
        }
      })
      .catch((error: any) => {
        this.notificationService.alert(error);
      });
  }
}
