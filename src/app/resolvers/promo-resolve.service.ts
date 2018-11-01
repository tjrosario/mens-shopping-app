import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import { RecurlyService } from '../services/recurly.service';


@Injectable()
export class PromoResolveService {

  constructor(
    private recurlyService: RecurlyService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot): Promise<any> | boolean {
    const url = _.first(route.url);
    const coupon_code = url.path.toLowerCase();
    const config = {};

    return this.recurlyService.getCoupon({ coupon_code }).then(res => {

      if (res.coupon) {
        return res.coupon;
      }

      return false;

    });
  }
}
