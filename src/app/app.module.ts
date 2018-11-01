import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ToastOptions } from 'ng2-toastr';
import { ToastConfig } from './config/toast';
import { NgProgressModule } from '@ngx-progressbar/core';
import { NgProgressHttpClientModule } from '@ngx-progressbar/http-client';
import { NgxPageScrollModule } from 'ngx-page-scroll';
import { BrowserXhr, RequestOptions } from '@angular/http';
import { TextMaskModule } from 'angular2-text-mask';
import { CreditCardDirectivesModule } from 'angular-cc-library';
import { BrowserCookiesModule } from '@ngx-utils/cookies/browser';
import { FacebookModule } from 'ngx-facebook';

import { Globals } from './config/globals';
import { AppComponent } from './app.component';
import { NavigationService } from './services/navigation.service';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './/app-routing.module';
import { HomepageComponent } from './homepage/homepage.component';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { StepsComponent } from './steps/steps.component';
import { BoxSelectionComponent } from './box-selection/box-selection.component';
import { FacebookPageComponent } from './facebook-page/facebook-page.component';
import { BenefitsComponent } from './benefits/benefits.component';
import { PersonalShopperComponent } from './personal-shopper/personal-shopper.component';
import { GetStartedCtaComponent } from './get-started-cta/get-started-cta.component';
import { ExperienceComponent } from './experience/experience.component';
import { BoxService } from './services/box.service';
import { BoxDescriptionComponent } from './box-description/box-description.component';
import { CompanyAddressComponent } from './company-address/company-address.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AboutComponent } from './about/about.component';
import { TeamMemberComponent } from './team-member/team-member.component';
import { TeamService } from './services/team.service';
import { BoxesComponent } from './boxes/boxes.component';
import { PerfectFitComponent } from './perfect-fit/perfect-fit.component';
import { ContactComponent } from './contact/contact.component';
import { ContactService } from './services/contact.service';
import { AffiliatesComponent } from './affiliates/affiliates.component';
import { BrandPreferencesComponent } from './brand-preferences/brand-preferences.component';
import { ExamplesComponent } from './examples/examples.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FaqService } from './services/faq.service';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { MessageService } from './services/message.service';
import { NotificationService } from './services/notification.service';
import { SignupComponent } from './signup/signup.component';
import { SizeService } from './services/size.service';
import { UtilsService } from './services/utils.service';
import { AttributeService } from './services/attribute.service';
import { CategoryService } from './services/category.service';
import { PriceRangeService } from './services/price-range.service';
import { CheckboxListComponent } from './checkbox-list/checkbox-list.component';
import { SignupStepComponent } from './signup/signup-step/signup-step.component';
import { ToggleBtnComponent } from './toggle-btn/toggle-btn.component';
import { BrandService } from './services/brand.service';
import { CustomerService } from './services/customer.service';
import { StyleDislikeService } from './services/style-dislike.service';
import { BrandDislikeService } from './services/brand-dislike.service';
import { PricePreferenceService } from './services/price-preference.service';
import { MailchimpService } from './services/mailchimp.service';
import { SignupConfirmComponent } from './signup/signup-confirm/signup-confirm.component';
import { FacebookService } from './services/facebook.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductCategoryService } from './services/product-category.service';
import { CheckoutFinalizeComponent } from './checkout/checkout-finalize/checkout-finalize.component';
import { OrderService } from './services/order.service';
import { AuthResolveService } from './resolvers/auth-resolve.service';
import { ShippingAddressFormComponent } from './shipping-address-form/shipping-address-form.component';
import { StatesService } from './services/states.service';
import { CreditCardFormComponent } from './credit-card-form/credit-card-form.component';
import { OrderFinancialsComponent } from './order/order-financials/order-financials.component';
import { AccountComponent } from './account/account.component';
import { StripeService } from './services/stripe.service';
import { SubscriptionService } from './services/subscription.service';
import { CheckoutConfirmComponent } from './checkout/checkout-confirm/checkout-confirm.component';
import { AddressService } from './services/address.service';
import { CanActivateViaAuthGuard } from './guards/can-activate-via-auth.guard';
import { CanActivateViaUnauthGuard } from './guards/can-activate-via-unauth.guard';
import { CanActivateViaAdminGuard } from './guards/can-activate-via-admin.guard';
import { AccountProfileComponent } from './account/account-profile/account-profile.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { AccountOverviewComponent } from './account/account-overview/account-overview.component';
import { HeightService } from './services/height.service';
import { PromoCodeFormComponent } from './promo-code-form/promo-code-form.component';
import { AccountCreditComponent } from './account/account-credit/account-credit.component';
import { GiftCardFormComponent } from './gift-card-form/gift-card-form.component';
import { AccountBillingComponent } from './account/account-billing/account-billing.component';
import { ModalCreditCardFormComponent } from './modals/modal-credit-card-form/modal-credit-card-form.component';
import { ModalSimpleComponent } from './modals/modal-simple/modal-simple.component';
import { AccountShippingComponent } from './account/account-shipping/account-shipping.component';
import { ModalShippingAddressFormComponent } from './modals/modal-shipping-address-form/modal-shipping-address-form.component';
import { AccountPreferencesComponent } from './account/account-preferences/account-preferences.component';
import { AccountOrdersComponent } from './account/account-orders/account-orders.component';
import { AccountOrderDetailsComponent } from './account/account-order-details/account-order-details.component';
import { AccountReferralsComponent } from './account/account-referrals/account-referrals.component';
import { ScriptLoaderComponent } from './script-loader/script-loader.component';
import { AccountSubscriptionsComponent } from './account/account-subscriptions/account-subscriptions.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { ModalSubscriptionFormComponent } from './modals/modal-subscription-form/modal-subscription-form.component';
import { MeasurementPreferenceService } from './services/measurement-preference.service';
import { OrderItemRejectFormComponent } from './order/order-item-reject-form/order-item-reject-form.component';
import { OrderItemReturnFormComponent } from './order/order-item-return-form/order-item-return-form.component';
import { ModalOrderItemRejectFormComponent } from './modals/modal-order-item-reject-form/modal-order-item-reject-form.component';
import { ModalOrderItemReturnFormComponent } from './modals/modal-order-item-return-form/modal-order-item-return-form.component';

import { MakePositivePipe } from './pipes/make-positive.pipe';
import { RemoveGenericPipe } from './pipes/remove-generic.pipe';
import { DeNullPipe } from './pipes/de-null.pipe';
import { OrderStatusPipe } from './pipes/order-status.pipe';
import { DollarsPipe } from './pipes/dollars.pipe';
import { ResetPasswordRequestFormComponent } from './reset-password-request-form/reset-password-request-form.component';
import { ModalResetPasswordRequestFormComponent } from './modals/modal-reset-password-request-form/modal-reset-password-request-form.component';
import { PostPurchaseComponent } from './referral-candy/post-purchase/post-purchase.component';
import { PromoResolveService } from './resolvers/promo-resolve.service';
import { PromoService } from './services/promo.service';
import { ModalPromoComponent } from './modals/modal-promo/modal-promo.component';
import { MailService } from './services/mail.service';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UniqueOfferingsComponent } from './unique-offerings/unique-offerings.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminComponent } from './admin/admin.component';
import { AdminOverviewComponent } from './admin/admin-overview/admin-overview.component';
import { AdminCustomersComponent } from './admin/admin-customers/admin-customers.component';
import { AdminOrderDetailsComponent } from './admin/admin-order-details/admin-order-details.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { UserProfileFormComponent } from './user-profile-form/user-profile-form.component';
import { GlobalFooterComponent } from './global-footer/global-footer.component';
import { RecurlyFormComponent } from './recurly-form/recurly-form.component';
import { RecurlyService } from './services/recurly.service';
import { RecurlySubscriptionFormComponent } from './recurly-subscription-form/recurly-subscription-form.component';
import { ModalRecurlySubscriptionFormComponent } from './modals/modal-recurly-subscription-form/modal-recurly-subscription-form.component';
import { RecurlyCouponFormComponent } from './recurly-coupon-form/recurly-coupon-form.component';
import { LuckyOrangeService } from './services/lucky-orange.service';
import { AccountSubscriptionsConfirmationComponent } from './account/account-subscriptions/account-subscriptions-confirmation/account-subscriptions-confirmation.component';
import { WINDOW_PROVIDERS } from "./services/window.service";
import { GoogleAnalyticsService } from './services/google-analytics.service';
import { EventTrackingService } from './services/event-tracking.service';

const APP_ID = 'threadlab';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomepageComponent,
    HowItWorksComponent,
    StepsComponent,
    BoxSelectionComponent,
    FacebookPageComponent,
    BenefitsComponent,
    PersonalShopperComponent,
    GetStartedCtaComponent,
    ExperienceComponent,
    BoxDescriptionComponent,
    CompanyAddressComponent,
    SocialMediaComponent,
    UserNavigationComponent,
    TermsComponent,
    PrivacyComponent,
    AboutComponent,
    TeamMemberComponent,
    BoxesComponent,
    PerfectFitComponent,
    ContactComponent,
    AffiliatesComponent,
    BrandPreferencesComponent,
    ExamplesComponent,
    SubscriptionsComponent,
    FaqsComponent,
    LoginComponent,
    SignupComponent,
    CheckboxListComponent,
    SignupStepComponent,
    ToggleBtnComponent,
    SignupConfirmComponent,
    CheckoutComponent,
    CheckoutFinalizeComponent,
    ShippingAddressFormComponent,
    CreditCardFormComponent,
    OrderFinancialsComponent,
    AccountComponent,
    CheckoutConfirmComponent,
    AccountProfileComponent,
    BreadcrumbsComponent,
    AccountOverviewComponent,
    PromoCodeFormComponent,
    AccountCreditComponent,
    GiftCardFormComponent,
    AccountBillingComponent,
    ModalCreditCardFormComponent,
    ModalSimpleComponent,
    AccountShippingComponent,
    ModalShippingAddressFormComponent,
    AccountPreferencesComponent,
    AccountOrdersComponent,
    AccountOrderDetailsComponent,
    AccountReferralsComponent,
    ScriptLoaderComponent,
    AccountSubscriptionsComponent,
    SubscriptionFormComponent,
    ModalSubscriptionFormComponent,
    OrderItemRejectFormComponent,
    OrderItemReturnFormComponent,
    ModalOrderItemRejectFormComponent,
    ModalOrderItemReturnFormComponent,
    MakePositivePipe,
    RemoveGenericPipe,
    DeNullPipe,
    OrderStatusPipe,
    DollarsPipe,
    ResetPasswordRequestFormComponent,
    ModalResetPasswordRequestFormComponent,
    PostPurchaseComponent,
    ModalPromoComponent,
    UniqueOfferingsComponent,
    ResetPasswordComponent,
    AdminComponent,
    AdminOverviewComponent,
    AdminCustomersComponent,
    AdminOrderDetailsComponent,
    AdminOrdersComponent,
    UserProfileFormComponent,
    GlobalFooterComponent,
    RecurlyFormComponent,
    RecurlySubscriptionFormComponent,
    ModalRecurlySubscriptionFormComponent,
    RecurlyCouponFormComponent,
    AccountSubscriptionsConfirmationComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule.withServerTransition({ appId: APP_ID }),
    ToastModule.forRoot(),
    LocalStorageModule.withConfig({
      prefix: APP_ID,
      storageType: 'localStorage'
    }),
    BrowserCookiesModule.forRoot(),
    FacebookModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgProgressModule.forRoot(),
    NgProgressHttpClientModule,
    BrowserAnimationsModule,
    NgxPageScrollModule,
    TextMaskModule,
    CreditCardDirectivesModule
  ],
  providers: [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: AuthInterceptor,
        multi: true
    },
    {
        provide: ToastOptions,
        useClass: ToastConfig
    },  
    Globals,
    NavigationService,
    BoxService,
    TeamService,
    ContactService,
    FaqService,
    AuthService,
    MessageService,
    NotificationService,
    SizeService,
    UtilsService,
    AttributeService,
    CategoryService,
    PriceRangeService,
    BrandService,
    CustomerService,
    StyleDislikeService,
    BrandDislikeService,
    PricePreferenceService,
    MailchimpService,
    FacebookService,
    ProductCategoryService,
    OrderService,
    AuthResolveService,
    StatesService,
    StripeService,
    SubscriptionService,
    AddressService,
    CanActivateViaAuthGuard,
    CanActivateViaUnauthGuard,
    CanActivateViaAdminGuard,
    HeightService,
    MeasurementPreferenceService,
    ToastsManager,
    PromoResolveService,
    PromoService,
    MailService,
    RecurlyService,
    GoogleAnalyticsService,
    LuckyOrangeService,
    WINDOW_PROVIDERS,
    EventTrackingService
  ],
  entryComponents: [
    ModalCreditCardFormComponent,
    ModalShippingAddressFormComponent,
    ModalSubscriptionFormComponent,
    ModalRecurlySubscriptionFormComponent,
    ModalOrderItemRejectFormComponent,
    ModalOrderItemReturnFormComponent,
    ModalResetPasswordRequestFormComponent,
    ModalPromoComponent,
    ModalSimpleComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
