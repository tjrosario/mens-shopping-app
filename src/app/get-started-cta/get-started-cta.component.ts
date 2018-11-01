import { Component, OnInit, Input } from '@angular/core';

import { User } from '../models/user.model';
import { EventTrackingService } from '../services/event-tracking.service';

@Component({
  selector: 'app-get-started-cta',
  templateUrl: './get-started-cta.component.html',
  styleUrls: ['./get-started-cta.component.scss']
})
export class GetStartedCtaComponent implements OnInit {

  @Input()
  user: User;

  constructor(
  	private eventTrackingService: EventTrackingService
  ) { }

  ngOnInit() {
  }

  trackGuest() {
  	this.eventTrackingService.trackEvent({
  		action: 'Call to Action Click',
  		category: 'Call to Action',
  		label: 'Get Started'
  	});
  }

  trackCustomer() {
  	this.eventTrackingService.trackEvent({
  		action: 'Call to Action Click',
  		category: 'Call to Action',
  		label: 'Place Order'
  	});
  }
}
