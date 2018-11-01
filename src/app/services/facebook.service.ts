import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { UtilsService } from './utils.service';
import { environment } from '../../environments/environment';

@Injectable()
export class FacebookService {

  private apiUrl = `${environment.apiUrl}/facebook`;

  private model = 'Facebook';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  accessToken({ config = {} }): Observable<any> {
    const url = `${this.apiUrl}/accessToken`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  page({ id, config = {} }): Observable<any> {
    const url = `https://graph.facebook.com/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractDataSimple(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  trackPixel(event, action, opts?) {
    opts = opts || void 0;
    setTimeout(() => {
      if (this.utilsService.isBrowser()) {
        if (window['fbq']) {
          if (opts) {
            window['fbq'](event, action, opts);
          } else {
            window['fbq'](event, action);
          }
        }
      }
    });
  }

  private extractData(res: Response | any) {
    return this.utilsService.extractData(res, this.model);
  }

  private extractDataSimple(res: Response | any) {
    return this.utilsService.extractData(res, this.model, {
      checkNode: res,
      returnData: res
    });
  }

  private handleErrorObservable(error: Response | any) {
    return this.utilsService.handleErrorObservable(error, this.model);
  }
}
