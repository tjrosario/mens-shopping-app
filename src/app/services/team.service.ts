import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { TeamMember } from '../models/team-member.model';
import { TEAM } from '../data/team';

@Injectable()
export class TeamService {

  constructor() { }

  getTeamMembers(): Observable<TeamMember[]> {
    return of(TEAM);
  }

}
