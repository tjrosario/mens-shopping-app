import { Injectable } from '@angular/core';

import { GoogleAnalyticsService } from './google-analytics.service';
import { LuckyOrangeService } from './lucky-orange.service';

@Injectable()
export class EventTrackingService {

  constructor(
    private googleAnalyticsService: GoogleAnalyticsService,
    private luckyOrangeService: LuckyOrangeService
  ) { }

  trackEvent({ action, category, label, value = '', non_interaction = false }) {

  	this.googleAnalyticsService.trackEvent({
  		action,
  		category,
  		label
  	});

    this.luckyOrangeService.addTag({
      customTag: `${category} - ${action} - ${label} - ${value}`
    });
  }

}
