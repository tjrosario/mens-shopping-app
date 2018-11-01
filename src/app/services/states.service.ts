import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { State } from '../models/state.model';
import { STATES } from '../data/states';

@Injectable()
export class StatesService {

  constructor() { }

  getStates(): Observable<State[]> {
    return of(STATES);
  }
}
