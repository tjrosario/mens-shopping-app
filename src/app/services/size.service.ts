import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Size } from '../models/size.model';
import { UtilsService } from './utils.service';

import { environment } from '../../environments/environment';

@Injectable()
export class SizeService {

  private apiUrl = `${environment.apiUrl}/size`;

  private model = 'Size';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  findAll({ config = {} }): Observable<Size[]> {
    const url = `${this.apiUrl}/findAll`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  private extractData(res: Response | any) {
    return this.utilsService.extractData(res, this.model, {
      returnData: res.data.sizes
    });
  }

  private handleErrorObservable(error: Response | any) {
    return this.utilsService.handleErrorObservable(error, this.model);
  }
}
