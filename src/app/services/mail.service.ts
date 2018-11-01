import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { UtilsService } from './utils.service';

import { environment } from '../../environments/environment';

@Injectable()
export class MailService {

  private apiUrl = `${environment.apiUrl}/mail`;

  private model = 'Mail';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }


  contact({ data = {} }): Observable<any> {
    const url = `${this.apiUrl}/contact`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  cancelOrder({ data = {} }): Observable<any> {
    const url = `${this.apiUrl}/cancelOrder`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  feedback({ data = {} }): Observable<any> {
    const url = `${this.apiUrl}/feedback`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  orderNoMatches({ data = {} }): Observable<any> {
    const url = `${this.apiUrl}/orderNoMatches`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  orderCategoryNoMatches({ data = {} }): Observable<any> {
    const url = `${this.apiUrl}/orderCategoryNoMatches`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  ops({ data = {} }): Observable<any> {
    const url = `${this.apiUrl}/ops`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  fitKit({ data = {} }): Observable<any> {
    const url = `${this.apiUrl}/fitKit`;

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
