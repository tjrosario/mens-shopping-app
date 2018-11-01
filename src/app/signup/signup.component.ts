import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import { Router } from '@angular/router';
import { FacebookService, InitParams, LoginResponse, LoginOptions } from 'ngx-facebook';

import * as _ from 'lodash';

import { Globals } from '../config/globals';
import { CustomerService } from '../services/customer.service';
import { SizeService } from '../services/size.service';
import { AttributeService } from '../services/attribute.service';
import { BrandService } from '../services/brand.service';
import { CategoryService } from '../services/category.service';
import { PriceRangeService } from '../services/price-range.service';
import { StyleDislikeService } from '../services/style-dislike.service';
import { BrandDislikeService } from '../services/brand-dislike.service';
import { PricePreferenceService } from '../services/price-preference.service';
import { MailchimpService } from '../services/mailchimp.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { UtilsService } from '../services/utils.service';
import { EventTrackingService } from '../services/event-tracking.service';
import { Category } from '../models/category.model';
import { PriceRange } from '../models/price-range.model';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';

declare let gtag: Function;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
    private globals: Globals,
    private customerService: CustomerService,
    private sizeService: SizeService,
    private attributeService: AttributeService,
    private priceRangeService: PriceRangeService,
    private styleDislikeService: StyleDislikeService,
    private brandDislikeService: BrandDislikeService,
    private pricePreferenceService: PricePreferenceService,
    private mailchimpService: MailchimpService,
    private brandService: BrandService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private categoryService: CategoryService,
    private utilsService: UtilsService,
    private pageScrollService: PageScrollService,
    private fb: FormBuilder,
    private router: Router,
    private fbService: FacebookService,
    private eventTrackingService: EventTrackingService,
    @Inject(DOCUMENT) private document: any
  ) {
    const content = 'Sign up for free. Fill out your profile with sizing, style, budget and the brands you like. Configure your subscription and get amazing clothes from awesome brands, effortlessly. Free shipping and free exchanges. One free bonus item and one eco-friendly brand in every order!';

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

  @ViewChild('signupContainer')
  private signupContainer: ElementRef;

  assetUrl = this.globals.assetUrl;

  ignoredWaistSizes = ['28'];
  ignoredInseams = [];

  shirtPatternCategories: Category[];
  shirtColorCategories: Category[];
  priceRangeTopsCategories: Category[];
  priceRangeBottomsCategories: Category[];

  casualShirtSizeOptions = {};
  waistSizeOptions = {};
  inseamOptions = {};
  pantsFitOptions = {};
  jeansFitOptions = {};
  shirtFitOptions = {};
  casualShirtFitOptions = {};
  casualShirtPattern = {};
  casualShirtColor = {};
  brandOptions = {};

  casualShirtPriceRangeOptions = {};
  dressPantsPriceRangeOptions = {};

  signupForm: FormGroup;

  loading = false;
  fbLoading = false;

  currentSection = 'profile';
  currentStep = 0;

  setProgress(percent) {
    this.completionPercentage = percent;
    this.completionPercentagePretty = percent + '%';
  }

  steps = [
    {
      section: 'Sizing',
      id: 'sizing',
      steps: [
        {
          id: 'shirt-size',
          name: 'casualShirtSizeOptions',
          data: {},
          limit: 1,
          section: 'Sizing',
          headline: 'Shirt Size',
          text: 'Shirt size you normally wear',
          pagingText: '1/3',
          buttonClass: 'col2-mobile',
          selectHandler: () => {
            if (this.casualShirtSizeOptions['selected'].length > 0) {
              this.scrollToStep('sizing', 2);
            }
          },
          percent: 5
        },
        {
          id: 'waist-size',
          name: 'waistSizeOptions',
          data: {},
          limit: 1,
          section: 'Sizing',
          headline: 'Waist Size',
          text: 'Your waist size',
          pagingText: '2/3',
          buttonClass: 'col4 col2-mobile',
          selectHandler: () => {
            if (this.waistSizeOptions['selected'].length > 0) {
              this.scrollToStep('sizing', 3);
            }
          },
          percent: 6
        },
        {
          id: 'inseam',
          name: 'inseamOptions',
          data: {},
          limit: 1,
          section: 'Sizing',
          headline: 'Inseam (Pant Length)',
          text: 'Length of pants (inseam)',
          pagingText: '3/3',
          buttonClass: 'col5 col2-mobile',
          selectHandler: () => {
            if (this.inseamOptions['selected'].length > 0) {
              this.scrollToStep('fit_style', 1);
            }
          },
          percent: 12
        }
      ]
    },
    {
      section: 'Fit & Style',
      id: 'fit_style',
      steps: [
        {
          id: 'pants-fit',
          name: 'jeansFitOptions',
          data: {},
          limit: 1,
          section: 'Fit & Style',
          headline: 'Pants Fit',
          text: 'How you like your pants to fit',
          pagingText: '1/4',
          buttonClass: 'col3 col3-mobile',
          selectHandler: () => {
            if (this.jeansFitOptions['selected'].length > 0) {
              this.scrollToStep('fit_style', 2);
            }
          },
          percent: 25
        },
        {
          id: 'shirt-fit',
          name: 'casualShirtFitOptions',
          data: {},
          limit: 1,
          section: 'Fit & Style',
          headline: 'Shirt Fit',
          text: 'How you like your shirts to fit',
          pagingText: '2/4',
          buttonClass: 'col2 col2-mobile',
          selectHandler: () => {
            if (this.casualShirtFitOptions['selected'].length > 0) {
              this.scrollToStep('fit_style', 3);
            }
          },
          percent: 30
        },
        {
          id: 'shirt-patterns',
          name: 'casualShirtPattern',
          data: {},
          limit: 1, // length - 1
          section: 'Fit & Style',
          headline: 'Shirt Patterns',
          text: 'Your favorite shirt patterns',
          pagingText: '3/4',
          buttonClass: 'col2-mobile',
          submitBtnText: 'Next, set your preferred colors',
          selectHandler: () => {
            this.scrollToStep('fit_style', 4);
          },
          disabledHandler: () => {
            /*
            if (this.casualShirtPattern['selected']) {
              return this.casualShirtPattern['selected'].length === 0;
            }*/
          },
          loadingHandler: function() {},
          type: 'antipref',
          percent: 35
        },
        {
          id: 'shirt-colors',
          name: 'casualShirtColor',
          data: {},
          limit: 1, // length - 1
          section: 'Fit & Style',
          headline: 'Shirt / Sweater Colors',
          text: 'Colors you like to wear',
          pagingText: '4/4',
          buttonClass: 'col4 col2-mobile',
          submitBtnText: 'Next, choose your pricing',
          selectHandler: () => {
            this.scrollToStep('pricing', 1);
          },
          disabledHandler: () => {
            /*
            if (this.casualShirtColor['selected']) {
              return this.casualShirtColor['selected'].length === 0;
            }*/
          },
          loadingHandler: function() {},
          type: 'antipref',
          percent: 40
        }
      ]
    },
    {
      section: 'Pricing',
      id: 'pricing',
      steps: [
        {
          id: 'shirt-price',
          name: 'casualShirtPriceRangeOptions',
          data: {},
          limit: 1, // length
          section: 'Pricing',
          headline: 'Shirt Price',
          text: 'Your preferred casual/button-up shirt price',
          pagingText: '1/2',
          buttonClass: 'col2-mobile',
          submitBtnText: 'Next, choose your pants pricing',
          selectHandler: () => {
            this.setTopsPriceRanges({
              callback: () => {
                this.scrollToStep('pricing', 2);
              }
            });
          },
          disabledHandler: () => {
            if (this.casualShirtPriceRangeOptions['selected']) {
              return this.casualShirtPriceRangeOptions['selected'].length === 0;
            }
          },
          loadingHandler: function() {},
          percent: 45
        },
        {
          id: 'pants-price',
          name: 'dressPantsPriceRangeOptions',
          data: {},
          limit: 1, // length
          section: 'Pricing',
          headline: 'Pants Price',
          text: 'Your preferred pants/jeans price',
          pagingText: '2/2',
          buttonClass: 'col2-mobile',
          submitBtnText: 'Next, choose your brands',
          selectHandler: () => {
            this.setBottomsPriceRanges({
              callback: () => {
                this.scrollToStep('brands', 1);
              }
            });
          },
          disabledHandler: () => {
            if (this.dressPantsPriceRangeOptions['selected']) {
              return this.dressPantsPriceRangeOptions['selected'].length === 0;
            }
          },
          loadingHandler: function() {},
          percent: 55
        }
      ]
    },
    {
      section: 'Brands',
      id: 'brands',
      steps: [
        {
          id: 'brands',
          name: 'brandOptions',
          data: {},
          limit: 1, // length - 1
          section: 'Brands',
          headline: 'Brands',
          text: 'Brands you wear or would like to try',
          description: 'These are just a small subset of the brands we offer',
          pagingText: '1/1',
          buttonClass: 'brands col4-mobile',
          submitBtnText: 'Next, create your profile',
          tertiaryBtnText: 'Skip this step',
          selectHandler: () => {
            this.scrollToStep('profile', 1);
          },
          skipHandler: () => {
            /*
            _.each(this.brandOptions['list'], brand => {
              brand['checked'] = true;
            });
            this.brandOptions['selected'] = this.brandOptions['list'];
            */
            
            this.scrollToStep('profile', 1);

            this.eventTrackingService.trackEvent({
              action: 'Skip this Step Click',
              category: 'Signup',
              label: 'Brands'
            });

          },
          disabledHandler: () => {},
          loadingHandler: function() {},
          type: 'antipref',
          percent: 65
        }
      ]
    },
    {
      section: 'Profile',
      id: 'profile',
      steps: [{
        id: 'profile',
        name: 'profileForm',
        section: 'Profile',
        data: {},
        limit: 0,
        percent: 85
      }],
    }
  ];

  section = {};
  step = {};
  totalSteps = this.getTotalSteps();
  completionPercentage = 0;
  completionPercentagePretty = '';

  ngOnInit() {
    this.getShirtSizes();
    this.getWaistSizes();
    this.getInseams();
    this.getPantFits();
    this.getShirtFits();
    this.getShirtPatterns();
    this.getShirtColors();
    this.getShirtPrices();
    this.getPantPrices();
    this.getBrands();
    //this.scrollToStep('start', 1);
    this.start();
  }

  start() {
    this.scrollToStep('sizing', 1);
  }

  getTotalSteps() {
    let numSteps = 0;
    _.each(this.steps, section => {
      numSteps += section.steps.length;
    });

    return numSteps;
  }

  facebookLogin() {
    const loginOptions: LoginOptions = {
      enable_profile_selector: true,
      return_scopes: true,
      scope: 'email,public_profile'
    };

    this.eventTrackingService.trackEvent({
      action: 'Create Your Account Submit',
      category: 'Signup',
      label: 'Create Your Account',
      value: 'Facebook'
    });

    this.fbService.login(loginOptions)
      .then((response: LoginResponse) => {
        if (response.authResponse) {
          const facebookId = response.authResponse.userID;

          this.fbLoading = true;

          this.fbService.api('/me?fields=id,first_name,last_name,email')
            .then((res: any) => {
              const info = {
                firstName: res.first_name,
                lastName: res.last_name,
                email: res.email,
                password: this.utilsService.generatePassword(),
                facebookId: res.id
              };

              const userPrefs = _.merge(info, this.getUserProfilePreferences());
              this.completeSignup(userPrefs);
            })
            .catch((error: any) => {
              this.notificationService.alert(error);
              this.fbLoading = false;
            });
        }
      })
      .catch((error: any) => {
        this.notificationService.alert(error);
        this.fbLoading = false;
      });
  }

  onSubmit() {
    const userPrefs = _.merge(this.signupForm.value, this.getUserProfilePreferences());
    this.completeSignup(userPrefs);

    this.eventTrackingService.trackEvent({
      action: 'Create Your Account Submit',
      category: 'Signup',
      label: 'Create Your Account',
      value: 'Email'
    });
  }

  completeSignup(params) {
    const config = {
      params
    };

    this.setFitandStylePreferences();

    this.loading = true;

    this.customerService.create({ config })
      .subscribe(customer => {
        if (customer) {
          this.onCustomerSave(customer)
            .subscribe(resp => {
              const type = customer.facebookId ? 'facebook' : 'email';

              const credentials = {
                username: params['email'],
                password: params['password']
              };

              this.setProgress(100);

              this.subscribeMailchimp(customer, {
                callback: () => {
                  this.login(credentials, type);
                }
              });
            });
        } else {
          this.loading = false;
          this.fbLoading = false;
        }
      });
  }

  login(credentials, type) {
    this.authService.login(credentials)
      .subscribe(user => {
        if (user) {
          this.loading = false;
          this.fbLoading = false;
          this.authService.setCurrentUser(user);
          this.router.navigate(['/signup', type, 'confirmation']);
          // this.Idle.watch();
        }
      });
  }

  subscribeMailchimp(customer, opts?) {
    opts = opts || {};
    opts.callback = opts.callback || (() => {});

    const data = {
      id: this.globals.mailchimp.lists.postSignup,
      email: {
        email: customer.email
      },
      merge_vars: {
        FNAME: customer.firstName,
        LNAME: customer.lastName
      },
      double_optin: false
    };

    this.mailchimpService.subscribeToList({ data })
      .subscribe(resp => {
        opts.callback();
      });
  }

  onCustomerSave(customer) {
    const colorDislikes = this.getColorPreferences();
    const shirtPatternDislikes = this.getShirtPatternPreferences();

    let promises;
    const promiseList = [];

    const styleDislikes = _.map(
      this.shirtFitOptions['unselected']
      .concat(this.pantsFitOptions['unselected'])
      .concat(colorDislikes)
      .concat(shirtPatternDislikes), attr => ({
        'customer.id': customer.id,
        'attribute.id': attr['id']
      })
    );

    const brandDislikes = _.map(
      this.brandOptions['selected'], brand => ({
        'customer.id': customer.id,
        'brand.id': brand['id']
      })
    );

    const prices = _.map(
      this['jeansPriceRange']['selected']
      .concat(this['shortsPriceRange']['selected'])
      .concat(this['chinosPriceRange']['selected'])
      .concat(this.dressPantsPriceRangeOptions['selected'])
      .concat(this.casualShirtPriceRangeOptions['selected'])
      .concat(this['golfPoloShirtPriceRange']['selected'])
      .concat(this['sweaterPriceRange']['selected'])
      .concat(this['sweatshirtPriceRange']['selected'])
      .concat(this['dressShirtPriceRange']['selected'])
      .concat(this['undershirtPriceRange']['selected'])
      .concat(this['tshirtPriceRange']['selected']), price => ({
        'customer.id': customer.id,
        'priceRange.id': price['id']
      })
    );

    promiseList.push(this.pricePreferenceService.createAll({ data: { data: prices }}));

    if (styleDislikes.length > 0) {
      promiseList.push(this.styleDislikeService.createAll({ data: { data: styleDislikes }}));
    }

    if (brandDislikes.length > 0) {
      promiseList.push(this.brandDislikeService.createAll({ data: { data: brandDislikes }}));
    }

    promises = Observable.forkJoin(promiseList);

    return promises;
  }

  setTopsPriceRanges(opts?) {
    opts = opts || {};
    opts.callback = opts.callback || (() => {});

    this.categoryService.getPriceRangeCategories()
      .subscribe(priceRangeCats => {
        const topsPriceRanges = _.filter(priceRangeCats, { type: 'top' });

        this.priceRangeTopsCategories = topsPriceRanges;

        const catsSelected = this.casualShirtPriceRangeOptions['selected'];

        const indexes = [];

        const total = this.priceRangeTopsCategories.length;

        let count = 0;

        _.each(catsSelected, cat => {
          const index = _.findIndex(this.casualShirtPriceRangeOptions['list'], { id: cat.id });
          indexes.push(index);
        });

        _.each(this.priceRangeTopsCategories, cat => {
          const config = {
            params: {
              xProductCategory: cat.name
            }
          };

          this.priceRangeService.findAll({ config })
            .subscribe(priceRanges => {
              const list = _.map(priceRanges, price => {
                price.value = this.utilsService.priceToText(price);
                return price;
              });

              const selected = [];

              _.each(priceRanges, (priceRange, idx) => {
                _.each(indexes, index => {
                  if (index === idx) {
                    selected.push(priceRange);
                  }
                });
              });

              if (selected.length === 0) {
                selected.push(priceRanges[0]);
              }

              this[cat.id] = {
                list: this.utilsService.sortByKey(list, 'upperLimit'),
                selected: this.utilsService.sortByKey(selected, 'upperLimit')
              };

              count++;

              if (count === total) {
                opts.callback();
              }
            });
        });
      });
  }

  setBottomsPriceRanges(opts?) {
    opts = opts || {};
    opts.callback = opts.callback || (() => {});

    this.categoryService.getPriceRangeCategories()
      .subscribe(priceRangeCats => {
        const bottomsPriceRanges = _.filter(priceRangeCats, { type: 'bottom' });

        this.priceRangeBottomsCategories = bottomsPriceRanges;

        const catsSelected = this.dressPantsPriceRangeOptions['selected'];

        const indexes = [];

        const total = this.priceRangeBottomsCategories.length;

        let count = 0;

        _.each(catsSelected, cat => {
          const index = _.findIndex(this.dressPantsPriceRangeOptions['list'], { id: cat.id });
          indexes.push(index);
        });

        _.each(this.priceRangeBottomsCategories, cat => {
          const config = {
            params: {
              xProductCategory: cat.name
            }
          };

          this.priceRangeService.findAll({ config })
            .subscribe(priceRanges => {
              const list = _.map(priceRanges, price => {
                price.value = this.utilsService.priceToText(price);
                return price;
              });

              const selected = [];

              _.each(priceRanges, (priceRange, idx) => {
                _.each(indexes, index => {
                  if (index === idx) {
                    selected.push(priceRange);
                  }
                });
              });

              if (selected.length === 0) {
                selected.push(priceRanges[0]);
              }

              this[cat.id] = {
                list: this.utilsService.sortByKey(list, 'upperLimit'),
                selected: this.utilsService.sortByKey(selected, 'upperLimit')
              };

              count++;

              if (count === total) {
                opts.callback();
              }
            });
        });
      });
  }

  getColorPreferences() {
    const colorPreferences = [];

    _.each(this.shirtColorCategories, cat => {
      if (cat.id !== 'casualShirtColor') {
        _.each(this[cat.id].list, attr => {
          _.each(this.casualShirtColor['selected'], casualShirtSelectedAttr => {
            if (attr.value === casualShirtSelectedAttr.value) {
              this[cat.id]['selected'].push(attr);
              colorPreferences.push(attr);
            }
          });
        });
      }
    });

    _.each(this.casualShirtColor['selected'], casualShirtSelectedAttr => {
      colorPreferences.push(casualShirtSelectedAttr);
    });

    return colorPreferences;
  }

  getShirtPatternPreferences() {
    const shirtPatternPreferences = [];

    _.each(this.shirtPatternCategories, cat => {
      if (cat.id !== 'casualShirtPattern') {
        _.each(this[cat.id].list, attr => {
          _.each(this.casualShirtPattern['selected'], casualShirtSelectedAttr => {
            if (attr.value === casualShirtSelectedAttr.value) {
              this[cat.id]['selected'].push(attr);
              shirtPatternPreferences.push(attr);
            }
          });
        });
      }
    });

    _.each(this.casualShirtPattern['selected'], casualShirtSelectedAttr => {
      shirtPatternPreferences.push(casualShirtSelectedAttr);
    });

    return shirtPatternPreferences;
  }

  setFitandStylePreferences() {
    this.setUnselected(this.jeansFitOptions, {
      mappings: {
        Relaxed: 'Regular'
      }
    });

    this.setUnselected(this.casualShirtFitOptions);

    this.setSizeDislikePrefs(this.jeansFitOptions, this.pantsFitOptions);
    this.setSizeDislikePrefs(this.casualShirtFitOptions, this.shirtFitOptions);

    this.setPreferenceMappings(this.shirtFitOptions, 'Slim', 'Extra Slim');
    this.setPreferenceMappings(this.shirtFitOptions, 'Regular', 'Full');
  }

  getUserProfilePreferences() {
    return {
      'statedWaist': _.first(this.waistSizeOptions['selected'])['value'],
      'statedInseam': _.first(this.inseamOptions['selected'])['value'],
      'statedPantFit': _.first(this.jeansFitOptions['selected'])['value'],
      'statedShirtSize': _.first(this.casualShirtSizeOptions['selected'])['value'],
      'signUpMethod': 'web-flow'
    };
  }

  setUnselected(options, opts?) {
    let found, foundMap, foundMapSelected;
    opts = opts || {};
    opts.mappings = opts.mappings || void 0;

    if (opts.mappings) {
      for (const key in opts.mappings) {
        if (opts.mappings.hasOwnProperty(key)) {
          found = _.first(_.filter(options['selected'], item => {
            return item.value === key;
          }));

          if (found) {
            foundMap = _.first(_.filter(options.list, item => {
              return item.value === opts.mappings[key];
            }));

            foundMapSelected = _.first(_.filter(options['selected'], item => {
              return item.value === opts.mappings[key];
            }));

            if (foundMap && !foundMapSelected) {
              options['selected'].push(foundMap);
            }
          }
        }
      }
    }

    const unselected = [];

    _.each(options.list, obj => {
      found = _.first(_.filter(options['selected'], item => {
        return item.id === obj.id;
      }));

      if (!found) {
        unselected.push(obj);
      }
    });

    options['unselected'] = unselected;
  }

  setSizeDislikePrefs(model, set) {
    let unselected;
    unselected = [];

    _.each(set.list, obj => {
      let exists, selectedID, selectedValue;

      _.each(model['unselected'], unsel => {
        if (obj.value === unsel.value) {
          unselected.push(obj);
        }
      });

      selectedID = _.find(model['selected'], { id: obj.id });

      selectedValue = _.find(model['selected'], { value: obj.value });

      exists = _.find(unselected, { value: obj.value });

      if (!selectedID && !selectedValue && !exists) {
        unselected.push(obj);
      }
    });

    set['unselected'] = unselected;
    set['selected'] = model['selected'];
  }

  setPreferenceMappings(set, conditionVal, setVal) {
    let foundCondition, foundSetVals;

    foundCondition = _.first(_.filter(set['selected'], (item) => {
      return item.value === conditionVal;
    }));

    if (foundCondition) {
      foundSetVals = _.filter(set['unselected'], (item) => {
        return item.value === setVal;
      });

      _.each(foundSetVals, obj => {
        const foundSelected = _.filter(set['unselected'], (item) => {
          return item.value === obj.value;
        });

        _.each(foundSelected, sel => {
          set['selected'].push(sel);

          _.each(set['unselected'], (unsel, i) => {
            if (unsel) {
              if (unsel.value === sel.value) {
                set['unselected'].splice(i, 1);
              }
            }
          });
        });
      });
    }
  }

  createForm() {
    this.signupForm = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(7)
      ]],
    });
  }

  signupFormValid() {
    if (!this.signupForm.valid) { return false; }

    return this.signupFieldsValid() &&
      this.signupForm.valid;
  }

  signupFieldsValid() {
    if (
      !this.casualShirtSizeOptions['selected'] ||
      !this.waistSizeOptions['selected'] ||
      !this.inseamOptions['selected'] ||
      !this.jeansFitOptions['selected']
      //!this.casualShirtFitOptions['selected'] ||
      //!this.casualShirtPattern['selected'] ||
      //!this.casualShirtColor['selected'] ||
      //!this.casualShirtPriceRangeOptions['selected'] ||
      //!this.dressPantsPriceRangeOptions['selected'] ||
      //!this.brandOptions['unselected'] ||
    ) { return false; }

    return this.waistSizeOptions['selected'].length > 0 &&
      this.inseamOptions['selected'].length > 0 &&
      this.jeansFitOptions['selected'].length > 0 &&
      this.casualShirtFitOptions['selected'].length > 0;
  }

  scrollToStep = (section, step) => {
    const selector = `#${section}_step_${step}`;
    
    /*
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: selector
    }); */

    const _section = _.find(this.steps, { id: section });

    if (_section) {
      this.section = _section;

      const _step = _section.steps[step - 1];

      if (_step) {
        this.step = _step;

        this.setProgress(_step['percent']);

        const pagePath = `/signup/${_step.id}`;

        if (window['gtag']) {
          gtag('config', this.globals.google.GA_TRACKING_ID, {
            'page_path': pagePath
          });
        }

        this.currentSection = _section.id;
        this.currentStep = step;

        /*
        const steps = this.getSteps();

        const index = _.findIndex(steps, step => step.name === _step.name);

        let percentage = index / this.totalSteps;
        percentage = percentage < 0 ? 0 : Math.round(percentage * 100);

        this.completionPercentage = percentage;
        this.completionPercentagePretty = percentage + '%'; */
      }
    } else {
      this.currentSection = 'start';
      this.currentStep = 0;
    }

    //this.pageScrollService.start(pageScrollInstance);
  }

  goToPreviousStep() {
    const steps = this.getSteps();
    const index = _.findIndex(steps, step => step.name === this.step['name']);

    if (index === 0) {
      this.scrollToStep('start', 1);
    } else {
      const previousStep = steps[index - 1];
      const previousStepSection = _.find(this.steps, { section: previousStep.section });
      const previousStepIndex = _.findIndex(previousStepSection.steps, step => step.name === previousStep.name);

      this.scrollToStep(previousStepSection.id, previousStepIndex + 1);
    }
  }

  getSteps() {
    const steps = [];
    _.each(this.steps, section => {
      _.each(section.steps, step => {
        steps.push(step);
      });
    });

    return steps;
  }

  getShirtSizes() {
    const config = {
      params: {
        xProductMeasurement: 'Generic Shirt Size',
        xProductCategory: 'Casual Shirt'
      }
    };

    this.sizeService.findAll({ config })
      .subscribe(sizes => {
        sizes = this.utilsService.sortSizes(sizes);

        this.casualShirtSizeOptions = {
          list: this.utilsService.deDuplicate(sizes, 'value'),
          selected: []
        };

        this.addDataToStep('Sizing', 'casualShirtSizeOptions', this.casualShirtSizeOptions);
      });
  }

  getWaistSizes() {
    const config = {
      params: {
        xProductMeasurement: 'Generic Waist'
      }
    };

    const ignored = this.ignoredWaistSizes;

    this.sizeService.findAll({ config })
      .subscribe(sizes => {

        // removed ignored
        _.each(sizes, (item, i) => {
          _.each(ignored, ignore => {
            if (item.value === ignore) {
              delete sizes[i];
            }
          });
        });

        sizes = this.utilsService.sortByKey(sizes, 'value');

        this.waistSizeOptions = {
          list: this.utilsService.deDuplicate(sizes, 'value'),
          selected: []
        };

        this.addDataToStep('Sizing', 'waistSizeOptions', this.waistSizeOptions);
      });
  }

  getInseams() {
    const config = {
      params: {
        xProductMeasurement: 'Generic Inseam'
      }
    };

    const ignored = this.ignoredInseams;

    this.sizeService.findAll({ config })
      .subscribe(sizes => {
        // removed ignored
        _.each(sizes, (item, i) => {
          _.each(ignored, ignore => {
            if (item.value === ignore) {
              delete sizes[i];
            }
          });
        });

        sizes = this.utilsService.sortByKey(sizes, 'value');

        this.inseamOptions = {
          list: this.utilsService.deDuplicate(sizes, 'value'),
          selected: []
        };

        this.addDataToStep('Sizing', 'inseamOptions', this.inseamOptions);
      });
  }

  getPantFits() {
    const config = {
      params: {
        xCharacteristic: 'Generic Pant Fit'
      }
    };

    this.attributeService.findAll({ config })
      .subscribe(attributes => {

        this.pantsFitOptions = {
          list: this.utilsService.sortSizes(_.map(attributes, attribute => attribute)),
          selected: []
        };

        const result = {};
        result['list'] = [];
        result['selected'] = [];

        const category = 'Jeans';

        _.each(this.pantsFitOptions['list'], fit => {
          if (fit.xProductCategory === category) {
            result['list'].push(fit);
          }
        });

        result['list'] = this.utilsService.sortFits(result['list']);

        this.jeansFitOptions = result;

        this.addDataToStep('Fit & Style', 'jeansFitOptions', this.jeansFitOptions);
      });
  }

  getShirtFits() {
    const config = {
      params: {
        xCharacteristic: 'Generic Shirt Fit'
      }
    };

    this.attributeService.findAll({ config })
      .subscribe(attributes => {

        this.shirtFitOptions = {
          list: attributes,
          selected: []
        };

        const result = {};
        result['list'] = [];
        result['selected'] = [];

        const category = 'Casual Shirt';

        _.each(this.shirtFitOptions['list'], fit => {
          if (fit.xProductCategory === category) {
            result['list'].push(fit);
          }
        });

        result['list'] = this.utilsService.sortFits(result['list']);

        this.casualShirtFitOptions = result;

        this.addDataToStep('Fit & Style', 'casualShirtFitOptions', this.casualShirtFitOptions);
      });
  }

  getShirtPatterns() {
    this.categoryService.getShirtPatternCategories()
      .subscribe(categories => {
        this.shirtPatternCategories = categories;

        _.each(this.shirtPatternCategories, cat => {
          const config = {
            params: {
              xCharacteristic: 'Pattern',
              xProductCategory: cat.name
            }
          };

          this.attributeService.findAll({ config })
            .subscribe(attributes => {
              const list = _.map(attributes, pattern => pattern);

              this[cat.id] = {
                list: list.sort(this.utilsService.sortAlphabetically),
                selected: []
              };

              this.addDataToStep('Fit & Style', cat.id, this[cat.id], {
                limit: this[cat.id]['list'].length - 1
              });
            });
        });
      });
  }

  addDataToStep(section, name, data, opts?) {
    opts = opts || {};

    const _section = _.find(this.steps, { section });

    const found = _.find(_section.steps, { name });

    if (found) {
      found.data = data;

      if (opts.limit) {
        found.limit = opts.limit;
      }
    }
  }

  getShirtColors() {
    this.categoryService.getShirtColorCategories()
      .subscribe(categories => {

        this.shirtColorCategories = categories;

        _.each(this.shirtColorCategories, cat => {
          const config = {
            params: {
              xCharacteristic: 'Color',
              xProductCategory: cat.name
            }
          };

          this.attributeService.findAll({ config })
            .subscribe(attributes => {
              const list = _.map(attributes, color => color);

              this[cat.id] = {
                list: list.sort(this.utilsService.sortAlphabetically),
                selected: []
              };

              this.addDataToStep('Fit & Style', cat.id, this[cat.id], {
                limit: this[cat.id]['list'].length - 1
              });
            });
        });

      });
  }

  getShirtPrices() {
    const config = {
      params: {
        xProductCategory: 'Casual Shirt'
      }
    };

    this.priceRangeService.findAll({ config })
      .subscribe(priceRanges => {
        const list = _.map(priceRanges, price => {
          price.value = this.utilsService.priceToText(price);
          return price;
        });

        this.casualShirtPriceRangeOptions = {
          list: this.utilsService.sortByKey(list, 'upperLimit'),
          selected: []
        };

        this.addDataToStep('Pricing', 'casualShirtPriceRangeOptions', this.casualShirtPriceRangeOptions, {
          limit: this.casualShirtPriceRangeOptions['list'].length
        });
      });
  }

  getPantPrices() {
    const config = {
      params: {
        xProductCategory: 'Dress Pants'
      }
    };

    this.priceRangeService.findAll({ config })
      .subscribe(priceRanges => {
        const list = _.map(priceRanges, price => {
          price.value = this.utilsService.priceToText(price);
          return price;
        });

        this.dressPantsPriceRangeOptions = {
          list: this.utilsService.sortByKey(list, 'upperLimit'),
          selected: []
        };

        this.addDataToStep('Pricing', 'dressPantsPriceRangeOptions', this.dressPantsPriceRangeOptions, {
          limit: this.dressPantsPriceRangeOptions['list'].length
        });
      });
  }

  getBrands() {
    const selectedBrands = [];

    this.brandService.getFeaturedBrands()
      .subscribe(featuredBrands => {

        this.brandService.list()
          .subscribe(brands => {
            const activeBrands = _.filter(brands, brand => {
              return brand.status === 'active';
            });

            _.each(featuredBrands, name => {
                const found = _.find(activeBrands, { name });
                if (found) { selectedBrands.push(found); }
            });

            this.brandOptions = {
              list: selectedBrands.sort(this.utilsService.sortAlphabetically),
              selected: []
            };

            this.addDataToStep('Brands', 'brandOptions', this.brandOptions, {
              limit: this.brandOptions['list'].length
            });
          });
      });
  }
}
