import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { UtilsService } from './utils.service';
import { Mailchimp } from '../models/mailchimp.model';

import { environment } from '../../environments/environment';

@Injectable()
export class MailchimpService {

  private apiUrl = `${environment.apiUrl}/mailchimp`;

  private model = 'MailChimp';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  subscribeToList({ data = {} }): Observable<Mailchimp> {
    const url = `${this.apiUrl}/lists/subscribe`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  private extractData(res: Response | any) {
    return this.utilsService.extractData(res, this.model);
  }

  private handleErrorObservable(error: Response | any) {
    return this.utilsService.handleErrorObservable(error, this.model);
  }

}
