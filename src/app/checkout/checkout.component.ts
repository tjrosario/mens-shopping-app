import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT} from '@angular/common';
import { PageScrollConfig, PageScrollService, PageScrollInstance } from 'ngx-page-scroll';
import { Router } from '@angular/router';

import * as _ from 'lodash';

import { Box } from '../models/box.model';
import { ProductCategoryService } from '../services/product-category.service';
import { ProductCategory } from '../models/product-category.model';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';
import { Globals } from '../config/globals';

declare let gtag: Function;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  constructor(
    private productCategoryService: ProductCategoryService,
    private pageScrollService: PageScrollService,
    @Inject(DOCUMENT) private document: any,
    private authService: AuthService,
    private customerService: CustomerService,
    private router: Router,
    private globals: Globals
  ) { }

  currentUser = null;

  loading = false;

  boxSelectorTxt = 'Choose Box';

  selectedBox: Box;

  productCategories = {};

  numCategories = 3;

  ngOnInit() {
    this.currentUser = this.authService.getCurrentUser();
    this.getProductCategories();
  }

  onSubmit() {
    const selectedCategories = this.productCategories['selected'];
    const budget = this.selectedBox['price'];
    const customer = this.currentUser;
    const productCategories = [];
    const params = {};

    _.each(selectedCategories, cat => {
      productCategories.push(cat.code);
    });

    params['productCategories'] = productCategories.join();
    params['budget'] = budget;
    params['expand'] = 'customer,orderItems/item,productNeeds/product';
    //params['customer.id'] = customer.id;

    if (window['gtag']) {
      gtag('config', this.globals.google.GA_TRACKING_ID, {
        'page_path': '/place-order/categories-selected'
      });
    }

    this.createOrder(params);
  }

  createOrder(params) {
    const config = {
      params
    };

    this.loading = true;

    this.customerService.createOrderFromProductNeeds({ config })
      .subscribe(order => {
        this.router.navigate(['/place-order', order.orderNumber, 'checkout']);
        this.loading = false;
      });
  }

  goToStep(step) {
    this.scrollToStep(`#checkout_step_${step}`);
  }

  isRequiredFieldsValid() {
    return this.selectedBox &&
      this.productCategories['selected'] &&
      this.productCategories['selected'].length > 0;
  }

  getProductCategories() {
    const config = {
      params: {
        expand: 'productMeasurements/allowedSizes,priceRanges,characteristics/allowedAttributes'
      }
    };

    this.productCategoryService.list({ config })
      .subscribe(productCategories => {
        const categories = _.filter(productCategories, category => {
          return category.status === 'active';
        });

        this.productCategories = {
          list: categories,
          selected: []
        };
      });
  }

  resetCategories() {
    _.each(this.productCategories['list'], category => {
      category.checked = false;
    });
    this.productCategories['selected'] = [];
  }

  selectBudget = (box) => {
    if (this.selectedBox) {
      this.selectedBox['selected'] = false;
    }

    box.selected = true;
    this.selectedBox = box;
    this.numCategories = box.numCategories;
    this.resetCategories();

    this.scrollToStep('#checkout_step_2');

    if (window['gtag']) {
      gtag('config', this.globals.google.GA_TRACKING_ID, {
        'page_path': '/place-order/budget-selected'
      });
    }
  }

  scrollToStep = (step) => {
    const pageScrollInstance: PageScrollInstance = PageScrollInstance.newInstance({
      document: this.document,
      scrollTarget: step
    });
    this.pageScrollService.start(pageScrollInstance);
  }
}
