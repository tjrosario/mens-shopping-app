import { Injectable } from '@angular/core';

declare let gtag: Function;

@Injectable()
export class GoogleAnalyticsService {

  constructor() { }

  trackEvent({ action, category, label, value = '', non_interaction = false }) {

  	if (window['gtag']) {
			gtag('event', action, {
			  'event_category': category,
			  'event_label': label,
			  'value': value,
			  'non_interaction': non_interaction
			});
  	}
  }

}
