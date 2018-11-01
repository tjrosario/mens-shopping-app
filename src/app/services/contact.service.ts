import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { CONTACT_SUBJECTS } from '../data/contact-subjects';
import { ContactSubject } from '../models/contact-subject.model';

import { environment } from '../../environments/environment';

@Injectable()
export class ContactService {

  constructor() { }


  getSubjects(): Observable<ContactSubject[]> {
    return of(CONTACT_SUBJECTS);
  }

}
