import { Component, OnInit } from '@angular/core';

import { SOCIAL_MEDIA } from '../data/social';
import { EventTrackingService } from '../services/event-tracking.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.scss']
})
export class SocialMediaComponent implements OnInit {

  constructor(
    private eventTrackingService: EventTrackingService
  ) { }

  socialMedia = SOCIAL_MEDIA;

  ngOnInit() {
  }

  track(social) {
    this.eventTrackingService.trackEvent({
      action: 'Social Media Click',
      category: 'Footer',
      label: social.platform
    });
  }

}
