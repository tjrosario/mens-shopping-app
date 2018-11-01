import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { UtilsService } from './utils.service';

import { environment } from '../../environments/environment';

@Injectable()
export class RecurlyService {

  private apiUrl = `${environment.apiUrl}/recurly`;

  private model = 'Recurly';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  createAccount({ data = {} }): Observable<any> {
    const url = `${this.apiUrl}/accounts`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  getCoupon({ coupon_code, config = {} }): Promise<any> {
    const url = `${this.apiUrl}/coupons/${coupon_code}`;

    return this.http.get(url, config)
      .toPromise()
      .then(res => res)
      .catch(error => this.handleErrorObservable(error));
  }

  getAccountRedemptions({ account_code, config = {} }): Observable<any> {
    const url = `${this.apiUrl}/accounts/${account_code}/redemptions`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  getSubscriptionRedemptions({ uuid, config = {} }): Observable<any> {
    const url = `${this.apiUrl}/subscriptions/${uuid}/redemptions`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  redeemCoupon({ coupon_code, data = {} }): Observable<any> {
    const url = `${this.apiUrl}/coupons/${coupon_code}/redeem`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error, {
          showAlert: true
        }))
      );
  }

  createAccountBillingInfo({ account_code, data = {} }): Observable<any> {
    const url = `${this.apiUrl}/accounts/${account_code}/billing_info`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error, {
        	showAlert: true
        }))
      );
  }

  getAccountBillingInfo({ account_code, config = {} }): Observable<any> {
    const url = `${this.apiUrl}/accounts/${account_code}/billing_info`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  createAccountShippingAddress({ account_code, data = {} }): Observable<any> {
    const url = `${this.apiUrl}/accounts/${account_code}/shipping_addresses`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error, {
        	showAlert: true
        }))
      );
  }

  getAccountShippingAddresses({ account_code, config = {} }): Observable<any> {
    const url = `${this.apiUrl}/accounts/${account_code}/shipping_addresses`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  createSubscription({ data = {} }): Observable<any> {
    const url = `${this.apiUrl}/subscriptions`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  getSubscription({ uuid, config = {} }): Observable<any> {
    const url = `${this.apiUrl}/subscriptions/${uuid}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  updateSubscription({ uuid, data = {} }): Observable<any> {
    const url = `${this.apiUrl}/subscriptions/${uuid}`;

    return this.http.put(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  cancelSubscription({ uuid, data = {} }): Observable<any> {
    const url = `${this.apiUrl}/subscriptions/${uuid}/cancel`;

    return this.http.put(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  reactivateSubscription({ uuid, data = {} }): Observable<any> {
    const url = `${this.apiUrl}/subscriptions/${uuid}/reactivate`;

    return this.http.put(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  updateSubscriptionNotes({ uuid, data = {} }): Observable<any> {
    const url = `${this.apiUrl}/subscriptions/${uuid}/notes`;

    return this.http.put(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  getAccountSubscriptions({ account_code, config = {} }): Observable<any> {
    const url = `${this.apiUrl}/accounts/${account_code}/subscriptions`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  getAccount({ account_code, config = {} }): Observable<any> {
    const url = `${this.apiUrl}/accounts/${account_code}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  getAccounts({ config = {} }): Observable<any> {
    const url = `${this.apiUrl}/accounts/list`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  getPlans({ config = {} }): Observable<any> {
    const url = `${this.apiUrl}/plans/list`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  getPlan({ plan_code, config = {} }): Observable<any> {
    const url = `${this.apiUrl}/plans/${plan_code}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  private extractData(res: Response | any, opts?) {
    opts = opts || {};
    return this.utilsService.extractData(res, this.model, opts);
  }

  private handleErrorObservable(error: Response | any, opts?) {
  	opts = opts || {};

  	const errorData = error.error;
  	let errorMsg;

  	// todo remove and accept error return data
  	if (errorData.errors) {
  		const transaction_error = errorData.errors.transaction_error;
  		if (transaction_error) {
  			errorMsg = transaction_error.customer_message;
  		} else  {
  			if (errorData.errors.error) {
  				errorMsg = errorData.errors.error._;
  			}
  		}
  	} else if (errorData.error) {
  		errorMsg = errorData.error.description._ || errorData.error.description;
  	} else {
  		errorMsg = 'An error has occurred.';
  	}

    console.log(errorMsg);

  	opts.errorMsg = errorMsg;

    return this.utilsService.handleErrorObservable(error, this.model, opts);
  }
}
