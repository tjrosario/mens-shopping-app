import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Order } from '../models/order.model';
import { UtilsService } from './utils.service';
import { OrderReason } from '../models/order-reason.model';
import { REJECT_REASONS } from '../data/reject-reasons';
import { RETURN_REASONS } from '../data/return-reasons';

import { environment } from '../../environments/environment';

@Injectable()
export class OrderService {

  private apiUrl = `${environment.apiUrl}/order`;

  private model = 'Order';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  create({ config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/create`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  get({ id, config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/show/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  update({ id, config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/update/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  find({ config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/find`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  findByOrderNumber({ config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/findByOrderNumber`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  findByOrderNumberAlt({ config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/findByOrderNumberAlt`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  applyPromo({ id, config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/applyPromo/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, { returnData: res['data']['order'] })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  finalize({ id, config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/finalize/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  cancel({ id, config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/cancel/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  accept({ id, config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/accept/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  reject({ id, config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/reject/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  confirm({ id, config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/confirm/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  checkout({ id, config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/checkout/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  rejectItem({ id, config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/rejectItem/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  undoRejectItem({ id, config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/undoRejectItem/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  returnItem({ id, config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/returnItem/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  undoReturnItem({ id, config = {} }): Observable<Order> {
    const url = `${this.apiUrl}/undoReturnItem/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  getRejectReasons(): Observable<OrderReason[]> {
    return of(REJECT_REASONS);
  }

  getReturnReasons(): Observable<OrderReason[]> {
    return of(RETURN_REASONS);
  }

  private extractData(res: Response | any, opts?) {
    opts = opts || {};
    return this.utilsService.extractData(res, this.model, opts);
  }

  private handleErrorObservable(error: Response | any) {
    return this.utilsService.handleErrorObservable(error, this.model);
  }
}
