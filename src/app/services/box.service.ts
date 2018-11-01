import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { BoxItem } from '../models/box-item.model';
import { BOXES } from '../data/boxes';

import { environment } from '../../environments/environment';

@Injectable()
export class BoxService {

  constructor() { }

  getBoxes(): Observable<BoxItem[]> {
    return of(BOXES);
  }

}
