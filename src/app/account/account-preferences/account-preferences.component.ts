import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash';

import { User } from '../../models/user.model';
import { ProductCategory } from '../../models/product-category.model';
import { Brand } from '../../models/brand.model';
import { BrandDislike } from '../../models/brand-dislike.model';
import { CustomerService } from '../../services/customer.service';
import { ProductCategoryService } from '../../services/product-category.service';
import { BrandService } from '../../services/brand.service';
import { BrandDislikeService } from '../../services/brand-dislike.service';
import { MeasurementPreferenceService } from '../../services/measurement-preference.service';
import { PricePreferenceService } from '../../services/price-preference.service';
import { StyleDislikeService } from '../../services/style-dislike.service';
import { UtilsService } from '../../services/utils.service';
import { AuthService } from '../../services/auth.service';
import { EventTrackingService } from '../../services/event-tracking.service';

@Component({
  selector: 'app-account-preferences',
  templateUrl: './account-preferences.component.html',
  styleUrls: ['./account-preferences.component.scss']
})
export class AccountPreferencesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomerService,
    private productCategoryService: ProductCategoryService,
    private brandService: BrandService,
    private brandDislikeService: BrandDislikeService,
    private measurementPreferenceService: MeasurementPreferenceService,
    private pricePreferenceService: PricePreferenceService,
    private styleDislikeService: StyleDislikeService,
    private utilsService: UtilsService,
    private authService: AuthService,
    private eventTrackingService: EventTrackingService
  ) { }

  currentUser: User;
  brands: Brand[];
  brandDislikes: BrandDislike[];
  brandPreferences = [];
  productCategories: ProductCategory[];
  productPreferences = [];

  loading = false;
  stylePrefsLoading = false;
  brandPrefsLoading = false;

  ngOnInit() {
    this.route.data
      .subscribe((data: { currentUser: User }) => {
        this.currentUser = data.currentUser;
        this.getCustomer();
      });
  }

  getCustomer() {
    const config = {
      params: {
        //'customer.id': this.currentUser.id,
        expand: 'styleDislikes/attribute,pricePreferences/priceRange,measurementPreferences/size,brandDislikes/brand'
      }
    };

    this.customerService.get({ config })
      .subscribe(user => {
        this.authService.setCurrentUser(user);
        this.currentUser = user;
        this.brandDislikes = user.brandDislikes;
        this.getProductCategories();
        this.getBrands();
      });
  }

  getProductCategories() {
    const config = {
      params: {
        expand: 'productMeasurements/allowedSizes,priceRanges,characteristics/allowedAttributes'
      }
    };

    this.stylePrefsLoading = true;

    this.productCategoryService.list({ config })
      .subscribe(productCategories => {
        this.productCategories = productCategories;
        this.productPreferences = this.normalizeProductCategoryData(productCategories);
        this.stylePrefsLoading = false;
      });
  }

  toggleMeasurementPreference(allowedSize) {
    if (allowedSize.selected) {
      const id = allowedSize.measurementPreference.id;

      this.measurementPreferenceService.delete({ id })
        .subscribe(measurementPreference => {
          allowedSize.selected = false;

          this.eventTrackingService.trackEvent({
            action: 'Remove Measurement Preference Submit',
            category: 'Preferences',
            label: 'Remove Measurement Preference'
          });
        });

    } else {
      const config = {
        params: {
          //'customer.id': this.currentUser.id,
          'size.id': allowedSize.id
        }
      };

      this.measurementPreferenceService.create({ config })
        .subscribe(measurementPreference => {
          allowedSize.selected = true;
          allowedSize.measurementPreference = measurementPreference;

          this.eventTrackingService.trackEvent({
            action: 'Add Measurement Preference Submit',
            category: 'Preferences',
            label: 'Add Measurement Preference'
          });
        });
    }
  }

  toggleProductPreference(allowedAttribute) {
    if (allowedAttribute.selected) {
      const id = allowedAttribute.productPreference.id;

      this.styleDislikeService.delete({ id })
        .subscribe(styleDislike => {
          allowedAttribute.selected = false;

          this.eventTrackingService.trackEvent({
            action: 'Remove Style Dislike Submit',
            category: 'Preferences',
            label: 'Remove Style Dislike'
          });
        });

    } else {
      const config = {
        params: {
          //'customer.id': this.currentUser.id,
          'attribute.id': allowedAttribute.id
        }
      };

      this.styleDislikeService.create({ config })
        .subscribe(styleDislike => {
          allowedAttribute.selected = true;
          allowedAttribute.productPreference = styleDislike;

          this.eventTrackingService.trackEvent({
            action: 'Add Style Dislike Submit',
            category: 'Preferences',
            label: 'Add Style Dislike'
          });
        });
    }
  }

  togglePricePreference(priceRange) {
    if (priceRange.selected) {
      const id = priceRange.pricePreference.id;

      this.pricePreferenceService.delete({ id })
        .subscribe(pricePreference => {
          priceRange.selected = false;

          this.eventTrackingService.trackEvent({
            action: 'Remove Price Preference Submit',
            category: 'Preferences',
            label: 'Remove Price Preference'
          });
        });

    } else {
      const config = {
        params: {
          //'customer.id': this.currentUser.id,
          'priceRange.id': priceRange.id
        }
      };

      this.pricePreferenceService.create({ config })
        .subscribe(pricePreference => {
          priceRange.selected = true;
          priceRange.pricePreference = pricePreference;

          this.eventTrackingService.trackEvent({
            action: 'Add Price Preference Submit',
            category: 'Preferences',
            label: 'Add Price Preference'
          });
        });
    }
  }

  togglePreference(preference) {
    preference.open = !preference.open;
  }

  normalizeProductCategoryData(productCategories) {
    const productPreferences = [];
    const customer = _.cloneDeep(this.currentUser);
    // const productCategories = _.cloneDeep(this.productCategories);
    const measurementPreferences = customer['measurementPreferences'];
    const pricePreferences = customer['pricePreferences'];
    const styleDislikes = customer['styleDislikes'];

    _.each(productCategories, cat => {
        let measurements = cat.productMeasurements;
        const priceRanges = cat.priceRanges.reverse();
        const characteristics = cat.characteristics;

        _.each(measurements, measurement => {
          const allowedSizes = measurement.allowedSizes.reverse();
          _.each(measurementPreferences, preference => {
            measurement.productPreferences = preference;
            if (preference.size.xProductCategory === measurement.xProductCategory) {
              if (preference.size.xProductMeasurement === measurement.name) {
                _.each(allowedSizes, size => {
                  if (preference.size.value === size.value) {
                    size.measurementPreference = preference;
                    size.selected = true;
                  }
                });
              }
            }
          });
        });

        _.each(priceRanges, price => {
          _.each(pricePreferences, preference => {
            price.productPreference = preference;
            if (preference.priceRange.xProductCategory === price.xProductCategory) {
              if ((preference.priceRange.lowerLimit === price.lowerLimit) && (preference.priceRange.upperLimit === price.upperLimit)) {
                price.pricePreference = preference;
                price.selected = true;
              }
            }
          });
        });

        _.each(characteristics, char => {
          const allowedAttributes = char.allowedAttributes.reverse();
          _.each(styleDislikes, styleDislike => {
            if (styleDislike.attribute.xProductCategory === char.xProductCategory) {
              if (styleDislike.attribute.xCharacteristic === char.name) {
                _.each(allowedAttributes, attribute => {
                  if (styleDislike.attribute.value === attribute.value) {
                    attribute.productPreference = styleDislike;
                    attribute.selected = true;
                  }
                });
              }
            }
          });
        });

        measurements = this.utilsService.sortByKey(measurements, 'name');

        const isBottom = (cat.name === 'Chinos') || (cat.name === 'Dress Pants') || (cat.name === 'Jeans');

        if (isBottom) {
          const gw = _.filter(measurements, e => e.name === 'Generic Waist');
          const gwRemoved = _.filter(measurements, e => e.name !== 'Generic Waist');
          gwRemoved.unshift(gw[0]);
          measurements = gwRemoved;
        }

        const row = {
          category: cat.name,
          status: cat.status,
          buttonClass: cat.name.replace(/\s+/g, '-').replace(/\//g, '').toLowerCase(),
          productMeasurements: measurements,
          priceRanges,
          characteristics: this.utilsService.sortByKey(characteristics, 'name')
        };

        if (row.status === 'active') {
          productPreferences.push(row);
        }
    });

    return productPreferences;
  }

  toggleBrandPreference(brand) {
    if (brand.selected) {
      this.removeBrandDislike(brand);
    } else {
      this.addBrandDislike(brand);
    }
  }

  removeBrandDislike(brand) {
    const id = brand.brandPreference.id;

    this.brandDislikeService.delete({ id })
      .subscribe(brandDislike => {
        brand.selected = false;

        this.eventTrackingService.trackEvent({
          action: 'Remove Brand Dislike Submit',
          category: 'Preferences',
          label: 'Remove Brand Dislike'
        });
      });
  }

  addBrandDislike(brand) {
    const config = {
      params: {
       // 'customer.id': this.currentUser.id,
        'brand.id': brand.id
      }
    };

    this.brandDislikeService.create({ config })
      .subscribe(brandDislike => {
        brand.selected = true;
        brand.brandPreference = brandDislike;

        this.eventTrackingService.trackEvent({
          action: 'Add Brand Dislike Submit',
          category: 'Preferences',
          label: 'Add Brand Dislike'
        });
      });
  }

  getBrands() {
    this.brandPrefsLoading = true;

    this.brandService.list()
      .subscribe(brands => {
        const activeBrands = _.filter(brands, brand => {
          return brand.status === 'active';
        });

        this.brands = activeBrands;
        this.getBrandPreferences(this.brands, this.brandDislikes);
        this.brandPrefsLoading = false;
      });
  }

  getBrandPreferences(brands, brandDislikes) {
    _.each(brands, brand => {
      brand.selected = false;

      _.each(brandDislikes, dislike => {
        if (dislike.brand.name === brand.name) {
          brand.brandPreference = dislike;
          brand.selected = true;
        }
      });

      this.brandPreferences.push(brand);
    });

    this.brandPreferences = this.utilsService.sortByKey(this.brandPreferences, 'name');
  }
}
