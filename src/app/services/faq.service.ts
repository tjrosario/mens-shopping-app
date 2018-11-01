import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { FaqItem } from '../models/faq-item.model';
import { FAQS } from '../data/faqs';

import { environment } from '../../environments/environment';

@Injectable()
export class FaqService {

  constructor() { }

  getFAQs(): Observable<FaqItem[]> {
    return of(FAQS);
  }

}
