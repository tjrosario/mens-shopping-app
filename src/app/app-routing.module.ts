import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AboutComponent } from './about/about.component';
import { BoxesComponent } from './boxes/boxes.component';
import { PerfectFitComponent } from './perfect-fit/perfect-fit.component';
import { ContactComponent } from './contact/contact.component';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { BrandPreferencesComponent } from './brand-preferences/brand-preferences.component';
import { ExamplesComponent } from './examples/examples.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { FaqsComponent } from './faqs/faqs.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SignupConfirmComponent } from './signup/signup-confirm/signup-confirm.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutFinalizeComponent } from './checkout/checkout-finalize/checkout-finalize.component';
import { CheckoutConfirmComponent } from './checkout/checkout-confirm/checkout-confirm.component';
import { AuthResolveService } from './resolvers/auth-resolve.service';
import { PromoResolveService } from './resolvers/promo-resolve.service';
import { CanActivateViaAuthGuard } from './guards/can-activate-via-auth.guard';
import { CanActivateViaUnauthGuard } from './guards/can-activate-via-unauth.guard';
import { CanActivateViaAdminGuard } from './guards/can-activate-via-admin.guard';

import { AccountComponent } from './account/account.component';
import { AccountOverviewComponent } from './account/account-overview/account-overview.component';
import { AccountProfileComponent } from './account/account-profile/account-profile.component';
import { AccountCreditComponent } from './account/account-credit/account-credit.component';
import { AccountBillingComponent } from './account/account-billing/account-billing.component';
import { AccountShippingComponent } from './account/account-shipping/account-shipping.component';
import { AccountPreferencesComponent } from './account/account-preferences/account-preferences.component';
import { AccountOrdersComponent } from './account/account-orders/account-orders.component';
import { AccountOrderDetailsComponent } from './account/account-order-details/account-order-details.component';
import { AccountReferralsComponent } from './account/account-referrals/account-referrals.component';
import { AccountSubscriptionsComponent } from './account/account-subscriptions/account-subscriptions.component';
import { AccountSubscriptionsConfirmationComponent } from './account/account-subscriptions/account-subscriptions-confirmation/account-subscriptions-confirmation.component';

import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOverviewComponent } from './admin/admin-overview/admin-overview.component';
import { AdminCustomersComponent } from './admin/admin-customers/admin-customers.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { AdminOrderDetailsComponent } from './admin/admin-order-details/admin-order-details.component';

const title = 'ThreadLab.  Men\'s clothing.  Easier.';

const onResolve = {
  currentUser: AuthResolveService
};

const onCouponResolve = {
  coupon: PromoResolveService
};

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomepageComponent,
    resolve: onResolve,
    data: {
      title: `${title}`
    }
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [CanActivateViaAuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: AccountOverviewComponent,
        resolve: onResolve,
        data: {
          title: `Account Overview | ${title}`,
          breadcrumb: 'Overview'
        },
      },
      {
        path: 'profile',
        component: AccountProfileComponent,
        resolve: onResolve,
        data: {
          title: `My Profile | ${title}`,
          breadcrumb: 'My Profile'
        }
      },
      {
        path: 'credit',
        component: AccountCreditComponent,
        resolve: onResolve,
        data: {
          title: `Gift Cards & Coupons | ${title}`,
          breadcrumb: 'Gift Cards & Coupons'
        }
      },
      {
        path: 'billing',
        component: AccountBillingComponent,
        resolve: onResolve,
        data: {
          title: `Billing Info | ${title}`,
          breadcrumb: 'Billing Info'
        }
      },
      {
        path: 'shipping',
        component: AccountShippingComponent,
        resolve: onResolve,
        data: {
          title: `My Addresses | ${title}`,
          breadcrumb: 'My Addresses'
        }
      },
      {
        path: 'preferences',
        component: AccountPreferencesComponent,
        resolve: onResolve,
        data: {
          title: `Preferences | ${title}`,
          breadcrumb: 'Preferences'
        }
      },
      {
        path: 'referrals',
        component: AccountReferralsComponent,
        resolve: onResolve,
        data: {
          title: `Referrals | ${title}`,
          breadcrumb: 'Referrals'
        }
      },
      {
        path: 'subscriptions',
        resolve: onResolve,
        children: [
          {
            path: '',
            redirectTo: 'me',
            pathMatch: 'full'
          },
          {
            path: 'me',
            component: AccountSubscriptionsComponent,
            resolve: onResolve,
            data: {
              title: `Subscriptions | ${title}`,
              breadcrumb: 'Subscriptions'
            }
          },
          {
            path: ':uuid/confirmation',
            component: AccountSubscriptionsConfirmationComponent,
            resolve: onResolve,
            data: {
              title: `Subscription Confirmation | ${title}`,
              breadcrumb: 'Subscription Confirmation'
            }
          }
        ]
      },
      {
        path: 'orders',
        resolve: onResolve,
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full'
          },
          {
            path: 'overview',
            component: AccountOrdersComponent,
            resolve: onResolve,
            data: {
              title: `My Orders | ${title}`,
              breadcrumb: 'My Orders'
            }
          },
          {
            path: ':orderNumber',
            component: AccountOrderDetailsComponent,
            resolve: onResolve,
            data: {
              title: `Order Details | ${title}`,
              breadcrumb: 'Order Details'
            }
          }
        ]
      }
    ]
  },
  {
    path: 'how-it-works',
    component: HowItWorksComponent,
    resolve: onResolve,
    data: {
      title: `How it Works | ${title}`
    }
  },
  {
    path: 'terms',
    component: TermsComponent,
    resolve: onResolve,
    data: {
      title: `Terms | ${title}`
    }
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
    resolve: onResolve,
    data: {
      title: `Privacy | ${title}`
    }
  },
  {
    path: 'about',
    component: AboutComponent,
    resolve: onResolve,
    data: {
      title: `About Us | ${title}`
    }
  },
  {
    path: 'boxes',
    component: BoxesComponent,
    resolve: onResolve,
    data: {
      title: `Boxes | ${title}`
    }
  },
  {
    path: 'contact',
    component: ContactComponent,
    resolve: onResolve,
    data: {
      title: `Contact | ${title}`
    }
  },
  {
    path: 'affiliates',
    //component: AffiliatesComponent,
    //resolve: onResolve,
    //data: {
      //title: `Affiliates | ${title}`
    //},
    redirectTo: '/home'
  },
  { 
    path: 'examples',
    component: ExamplesComponent,
    resolve: onResolve,
    data: {
      title: `Examples | ${title}`
    }
  },
  {
    path: 'subscriptions',
    component: SubscriptionsComponent,
    resolve: onResolve,
    data: {
      title: `Subscriptions | ${title}`
    }
  },
  {
    path: 'faq',
    component: FaqsComponent,
    resolve: onResolve,
    data: {
      title: `FAQ | ${title}`
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: onResolve,
    data: {
      title: `Sign in | ${title}`
    },
    canActivate: [CanActivateViaUnauthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    resolve: onResolve,
    data: {
      title: `Signup | ${title}`
    },
    canActivate: [CanActivateViaUnauthGuard]
  },
  {
    path: 'signup/:type/confirmation',
    component: SignupConfirmComponent,
    resolve: onResolve,
    data: {
      title: `Signup Confirmation | ${title}`
    },
    canActivate: [CanActivateViaAuthGuard]
  },

  /*
  {
    path: 'place-order',
    component: CheckoutComponent,
    resolve: onResolve,
    data: {
      title: `Place Your Order | ${title}`
    },
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: 'place-order/:orderNumber/checkout',
    component: CheckoutFinalizeComponent,
    resolve: onResolve,
    data: {
      title: `Place Your Order | ${title}`
    },
    canActivate: [CanActivateViaAuthGuard]
  },
  {
    path: 'place-order/:orderNumber/confirmation',
    component: CheckoutConfirmComponent,
    resolve: onResolve,
    data: {
      title: `Your Order Has Been Placed | ${title}`
    },
    canActivate: [CanActivateViaAuthGuard]
  },
  */
  {
    path: 'reset-password/:id',
    component: ResetPasswordComponent,
    resolve: onResolve,
    data: {
      title: `Reset Password | ${title}`
    }
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [CanActivateViaAdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'overview',
        pathMatch: 'full'
      },
      {
        path: 'overview',
        component: AdminOverviewComponent,
        resolve: onResolve,
        data: {
          title: `Admin Overview | ${title}`,
          breadcrumb: 'Overview'
        },
      },
      {
        path: 'customers',
        component: AdminCustomersComponent,
        resolve: onResolve,
        data: {
          title: `Admin Customers | ${title}`,
          breadcrumb: 'Customers'
        },
      },
      {
        path: 'orders',
        resolve: onResolve,
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full'
          },
          {
            path: 'overview',
            component: AdminOrdersComponent,
            resolve: onResolve,
            data: {
              title: `Admin Orders | ${title}`,
              breadcrumb: 'Orders'
            }
          },
          {
            path: ':orderNumber',
            component: AdminOrderDetailsComponent,
            resolve: onResolve,
            data: {
              title: `Admin Order Details | ${title}`,
              breadcrumb: 'Order Details'
            }
          }
        ]
      }
    ]
  },
  { 
    path: '**',
    resolve: {
      currentUser: onResolve.currentUser,
      coupon: onCouponResolve.coupon
    },
    component: HomepageComponent,
    data: {
      title: `Home | ${title}`
    }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
