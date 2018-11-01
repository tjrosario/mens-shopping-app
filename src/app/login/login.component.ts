import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';
import { NotificationService } from '../services/notification.service';
import { UtilsService } from '../services/utils.service';
import { ModalSimpleComponent } from '../modals/modal-simple/modal-simple.component';
import { ModalResetPasswordRequestFormComponent } from '../modals/modal-reset-password-request-form/modal-reset-password-request-form.component';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private customerService: CustomerService,
    private notificationService: NotificationService,
    private utilsService: UtilsService,
    private modalService: NgbModal,
    private fbService: FacebookService
  ) {
    const content = 'Sign in to your account to track, view or place your next order, manage product and brand preferences and personal account information.';

    this.utilsService.setMetaTags([
      {
        name: 'description',
        content
      },
      {
        property: 'og:description',
        content
      },
      {
        name: 'twitter:description',
        content
      }
    ]);

    let initParams: InitParams = environment.facebook.app;

    this.fbService.init(initParams);

    this.createForm();
  }

  loginForm: FormGroup;

  loading = false;
  fbLoading = false;

  ngOnInit() {
  }

  resetPassword() {
    const modalRef = this.modalService.open(ModalResetPasswordRequestFormComponent);

    modalRef.result.then((form) => {
      const formData = form.resetPasswordRequestForm.value;

      const config = {
        params: formData
      };

      this.customerService.getLogin({ config })
        .subscribe(userLogin => {
          if (userLogin) {
            const id = userLogin.id;

            this.customerService.resetPassword({ id })
              .subscribe(user => {
                const msg = `An email has been sent to ${formData.email} with instructions on resetting your password`;
                this.notificationService.success(msg);
              });
          }
        });
    }, (reason) => {});
  }

  createForm() {
    this.loginForm = this.fb.group({
      'username': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(7)
      ]],
    });
  }

  onSubmit() {
    this.loading = true;

    this.authService.login(this.loginForm.value)
      .subscribe(user => {
        if (user) {
          this.authService.setCurrentUser(user);
          this.authService.redirectToAttemptedUrl();
          this.greetUser(user);
          // this.Idle.watch();
        }

        this.loading = false;
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
          this.fbLogin(response.authResponse.userID);
        }
      })
      .catch((error: any) => {
        this.notificationService.alert(error);
      });
  }

  fbLogin(facebookId) {
    const credentials = {
        facebookId
    };

    this.fbLoading = true;

    this.authService.fbLogin(credentials)
      .subscribe(user => {
        if (user) {
          this.authService.setCurrentUser(user);
          this.authService.redirectToAttemptedUrl();
          this.greetUser(user);
          // this.Idle.watch();
        }

        this.fbLoading = false;
      });
  }

  greetUser(user) {
    const title = this.utilsService.getGreeting(new Date().getHours());
    const msg = `Welcome, ${user.firstName}!`;

    this.notificationService.info(msg, title);
  }
}
