import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { HEIGHTS } from '../data/heights';
import { Height } from '../models/height.model';

import { environment } from '../../environments/environment';

@Injectable()
export class HeightService {

  constructor() { }

  getHeights(): Observable<Height[]> {
    return of(HEIGHTS);
  }

}
