import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Order } from '../models/order.model';
import { UtilsService } from './utils.service';

import { environment } from '../../environments/environment';

@Injectable()
export class CustomerService {

  private apiUrl = `${environment.apiUrl}/customer`;

  private model = 'Customer';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  create({ config = {} }): Observable<User> {
    const url = `${this.apiUrl}/create`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  get({ config = {} }): Observable<User> {
    const url = `${this.apiUrl}/show`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  fetch({ config = {} }): Observable<User> {
    const url = `${this.apiUrl}/fetch`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  find({ config = {} }): Observable<User> {
    const url = `${this.apiUrl}/find`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  update({ config = {} }): Observable<User> {
    const url = `${this.apiUrl}/update`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  update_admin({ config = {} }): Observable<User> {
    const url = `${this.apiUrl}/update_admin`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  createOrderFromProductNeeds({ config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/createOrderFromProductNeeds`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, { returnData: res['data']['order'] })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  redeemGiftCard({ config = {} }): Observable<User> {
    const url = `${this.apiUrl}/redeemGiftCard`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, { returnData: res })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  resetPassword({ id, config = {} }): Observable<User> {
    const url = `${this.apiUrl}/resetPassword/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  updatePassword({ config = {} }): Observable<User> {
    const url = `${this.apiUrl}/updatePassword`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  getLogin({ config = {} }): Observable<User> {
    const url = `${this.apiUrl}/getLogin`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  receipt({ data = {} }): Observable<User> {
    const url = `${this.apiUrl}/receipt`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res)),
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
