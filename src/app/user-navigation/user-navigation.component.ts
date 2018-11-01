import { Component, OnInit, Input } from '@angular/core';

import { NavItem } from '../models/nav-item.model';
import { EventTrackingService } from '../services/event-tracking.service';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.scss']
})
export class UserNavigationComponent implements OnInit {

  constructor(
    private eventTrackingService: EventTrackingService
  ) { }

  @Input()
  items: object = [];

  @Input()
  clickHandler: Function;

  ngOnInit() {
  }

  track(navItem) {
    this.eventTrackingService.trackEvent({
      action: 'Header Nav Click',
      category: 'Header',
      label: navItem.title
    });
  }

}
