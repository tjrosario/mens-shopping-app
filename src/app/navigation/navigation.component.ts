import { Component, OnInit, Input } from '@angular/core';

import { NavSection } from '../models/nav-section.model';
import { EventTrackingService } from '../services/event-tracking.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(
    private eventTrackingService: EventTrackingService
  ) { }

  @Input()
  sections: NavSection[];

  @Input()
  category?: string;

  @Input()
  action?: string;

  ngOnInit() {
  }

  track(navItem) {
    this.eventTrackingService.trackEvent({
      action: this.action,
      category: this.category,
      label: navItem.name
    });
  }
}
