import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Brand } from '../models/brand.model';
import { UtilsService } from './utils.service';
import { FEATURED_BRANDS } from '../data/featured-brands';

import { environment } from '../../environments/environment';

@Injectable()
export class BrandService {

  private apiUrl = `${environment.apiUrl}/brand`;

  private model = 'Brand';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  findAll({ config = {} }): Observable<Brand[]> {
    const url = `${this.apiUrl}/findAll`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  list(): Observable<Brand[]> {
    const url = `${this.apiUrl}/list`;

    return this.http.get(url)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  getFeaturedBrands(): Observable<any[]> {
    return of(FEATURED_BRANDS);
  }

  private extractData(res: Response | any) {
    return this.utilsService.extractData(res, this.model, {
      returnData: res.data.brands
    });
  }

  private handleErrorObservable(error: Response | any) {
    return this.utilsService.handleErrorObservable(error, this.model);
  }

}
