import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { ProductCategory } from '../models/product-category.model';
import { UtilsService } from './utils.service';

import { environment } from '../../environments/environment';

@Injectable()
export class ProductCategoryService {

  private apiUrl = `${environment.apiUrl}/productCategory`;

  private model = 'ProductCategory';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  list({ config = {} }): Observable<ProductCategory[]> {
    const url = `${this.apiUrl}/list`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  private extractData(res: Response | any) {
    return this.utilsService.extractData(res, this.model, {
      returnData: res.data.productCategorys
    });
  }

  private handleErrorObservable(error: Response | any) {
    return this.utilsService.handleErrorObservable(error, this.model);
  }

}
