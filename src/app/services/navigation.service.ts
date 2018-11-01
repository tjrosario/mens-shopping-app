import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { NavSection } from '../models/nav-section.model';
import { NavItem } from '../models/nav-item.model';
import { GLOBAL_ITEMS } from '../data/global-navigation';
import { USER_GUEST_ITEMS, USER_MEMBER_ITEMS } from '../data/user-navigation';
import { ACCOUNT_ITEMS } from '../data/account-navigation';

@Injectable()
export class NavigationService {

  constructor() { }

  getGlobalEntities(): Observable<NavSection[]> {
    return of(GLOBAL_ITEMS);
  }

  getAccountEntities(): Observable<NavItem[]> {
    return of(ACCOUNT_ITEMS);
  }

  getUserGuestEntities(): Observable<NavItem[]> {
    return of(USER_GUEST_ITEMS);
  }

  getUserMemberEntities(): Observable<NavItem[]> {
    return of(USER_MEMBER_ITEMS);
  }
}
