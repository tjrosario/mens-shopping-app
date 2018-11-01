import { Component, OnInit } from '@angular/core';

import { Globals } from '../config/globals';
import { EventTrackingService } from '../services/event-tracking.service';
import { OFFERINGS } from '../data/offerings';

@Component({
  selector: 'app-unique-offerings',
  templateUrl: './unique-offerings.component.html',
  styleUrls: ['./unique-offerings.component.scss']
})
export class UniqueOfferingsComponent implements OnInit {

  constructor(
  	private globals: Globals,
  	private eventTrackingService: EventTrackingService
  ) { }

  assetUrl = this.globals.assetUrl;

  offerings = OFFERINGS;

  ngOnInit() {
  	
  }

  track(offering) {
  	this.eventTrackingService.trackEvent({
  		action: 'Offering Click',
  		category: 'Offerings',
  		label: offering.title,
  		value: offering.description
  	});
  }

}
