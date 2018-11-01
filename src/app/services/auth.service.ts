import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { CookiesService } from '@ngx-utils/cookies';

import { UtilsService } from './utils.service';
import { User } from '../models/user.model';
import { Globals } from '../config/globals';

import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  private apiUrl = `${environment.apiUrl}/auth`;

  private model = 'User';

  constructor(
    private http: HttpClient,
    private utilsService: UtilsService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private globals: Globals,
    private cookiesService: CookiesService
  ) { }

  timer = null;

  expiry = this.globals.auth.expiry.minutes;

  refreshDuration = 1000 * 60 * this.expiry;

  login(data: object): Observable<User> {
    const url = `${this.apiUrl}/login`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          errorMsg: 'User not found'
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  fbLogin(data: object): Observable<User> {
    const url = `${this.apiUrl}/fbLogin`;

    return this.http.post(url, data)
      .pipe(
        map((res: Response) => this.extractData(res, {
          errorMsg: 'User not found'
        })),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  logout() {
    const url = `${this.apiUrl}/logout`;

    return this.http.get(url)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  current(): Observable<User> {
    const url = `${this.apiUrl}/current`;

    return this.http.get(url)
      .pipe(
        map((res: Response) => this.extractData(res)),
        catchError((error: Response) => this.handleErrorObservable(error))
      );
  }

  checkCurrentUser() {
    this.current()
      .subscribe(user => {
        if (user) {}
      });
  }

  setCurrentUser(data) {
    const cookieOptions = {
      expires: this.utilsService.dateAdd(new Date(), 'minute', this.expiry)
    };

    this.localStorageService.set('currentUser', JSON.stringify(data));

    if (data.role) {
      this.localStorageService.set('currentUserRole', JSON.stringify(data.role));
    }
    
    //this.cookiesService.put('authToken', data.id, cookieOptions);
    this.cookiesService.put('authToken', data.id, { expires: '01/01/2020' });

    //this.refreshAfterInterval(this.refreshDuration);
  }

  getCurrentUser() {
    return JSON.parse(this.localStorageService.get('currentUser')) || false;
  }

  getCurrentUserRole() {
    return JSON.parse(this.localStorageService.get('currentUserRole')) || false;
  }

  getCurrentAuthToken() {
    return this.cookiesService.get('authToken') || false;
  }

  isAuthenticated() {
   return Boolean(this.getCurrentAuthToken());
  }

  refreshAfterInterval(refreshInterval) {
    this.clearTimer();

    this.timer = setTimeout(() => {
      this.refreshData(refreshInterval);
    }, refreshInterval);
  }

  refreshData(refreshInterval) {
    // this.checkCurrentUser();
    this.refreshAfterInterval(refreshInterval);
  }

  clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  clearUser() {
    this.localStorageService.remove('currentUser');
    this.localStorageService.remove('currentUserRole');
    this.cookiesService.remove('authToken');
    this.clearTimer();
  }

  saveAttemptUrl() {
    const path = this.router.url;
    const validPath = path.indexOf('/login') === -1;

    if (validPath) {
      this.setAttemptUrl(path);
    } else {
      const current = this.localStorageService.get('attemptUrl');
      this.setAttemptUrl(current);
    }
  }

  setAttemptUrl(url) {
    const valid = url.indexOf('/login') === -1;
    let path = this.localStorageService.get('attemptUrl');;

    if (valid) { 
      path = url;
    }

    this.localStorageService.set('attemptUrl', path);
  }

  redirectToAttemptedUrl() {
    const url = this.localStorageService.get('attemptUrl') || '/';

    this.router.navigate([url]);
    this.localStorageService.remove('attemptUrl');
  }

  private extractData(res: Response | any, opts?) {
    opts = opts || {};
    return this.utilsService.extractData(res, this.model, opts);
  }

  private handleErrorObservable(error: Response | any) {
    return this.utilsService.handleErrorObservable(error, this.model);
  }
}
