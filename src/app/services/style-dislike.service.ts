import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { StyleDislike } from '../models/style-dislike.model';
import { UtilsService } from './utils.service';

import { environment } from '../../environments/environment';

@Injectable()
export class StyleDislikeService {

  private apiUrl = `${environment.apiUrl}/styleDislike`;

  private model = 'StyleDislike';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService
  ) { }

  createAll({ data = {} }): Observable<StyleDislike[]> {
    const url = `${this.apiUrl}/createAllJSON`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  create({ config = {} }): Observable<StyleDislike> {
    const url = `${this.apiUrl}/create`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  get({ id, config = {} }): Observable<StyleDislike> {
    const url = `${this.apiUrl}/show/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  update({ id, config = {} }): Observable<StyleDislike> {
    const url = `${this.apiUrl}/update/${id}`;

    return this.http.get(url, config)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  delete({ id, config = {} }): Observable<StyleDislike> {
    const url = `${this.apiUrl}/delete/${id}`;

    return this.http.get(url, config)
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
