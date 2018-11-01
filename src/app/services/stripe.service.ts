import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { UtilsService } from './utils.service';

import { environment } from '../../environments/environment';

@Injectable()
export class StripeService {

  private apiUrl = `${environment.apiUrl}/stripe`;

  private model = 'Stripe';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  getDashBoardUrl() {
    return environment.production ? 'https://dashboard.stripe.com' : 'https://dashboard.stripe.com/test';
  }

  updateSubscription({ subscriptionId, data = {} }): Observable<any> {
    const url = `${this.apiUrl}/subscriptions/${subscriptionId}`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  deleteSubscription({ subscriptionId, data = {} }): Observable<any> {
    const url = `${this.apiUrl}/subscriptions/${subscriptionId}`;

    return this.http.delete(url, data)
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

  getCustomer({ id, config = {} }): Observable<any> {
    const url = `${this.apiUrl}/customers/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  createCustomer({ data = {} }): Observable<any> {
    const url = `${this.apiUrl}/customers`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  updateCustomer({ customerId, data = {} }): Observable<any> {
    const url = `${this.apiUrl}/customers/${customerId}`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  addCharge({ data = {} }): Observable<any> {
    const url = `${this.apiUrl}/charges`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  getCharge({ chargeId, config = {} }): Observable<any> {
    const url = `${this.apiUrl}/charges/${chargeId}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  addCard({ customerId, data = {} }): Observable<any> {
    const url = `${this.apiUrl}/customers/${customerId}/sources`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  updateCard({ customerId, cardId, data = {} }): Observable<any> {
    const url = `${this.apiUrl}/customers/${customerId}/sources/${cardId}`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  deleteCard({ customerId, cardId, data = {} }): Observable<any> {
    const url = `${this.apiUrl}/customers/${customerId}/sources/${cardId}`;

    return this.http.delete(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          checkNode: res,
          returnData: res
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  createToken({ data = {} }): Observable<any> {
    const url = `${this.apiUrl}/tokens`;

    return this.http.post(url, data)
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

  private handleErrorObservable(error: Response | any) {
    return this.utilsService.handleErrorObservable(error, this.model);
  }
}
