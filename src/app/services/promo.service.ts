import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/toPromise';

import { Promo } from '../models/promo.model';
import { UtilsService } from './utils.service';

import { environment } from '../../environments/environment';

@Injectable()
export class PromoService {

  private apiUrl = `${environment.apiUrl}/promo`;

  private model = 'Promo';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  list({ config = {} }): Promise<any> {
    const url = `${this.apiUrl}/list`;

    return this.http.get(url, config)
    	.toPromise()
    	.then(res => res['data']['promos']);
  }

  findAll({ config = {} }): Observable<Promo[]> {
    const url = `${this.apiUrl}/findAll`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res, { returnData: res['data']['promos'] })),
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
