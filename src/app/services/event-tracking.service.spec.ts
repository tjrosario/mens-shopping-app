import { TestBed, inject } from '@angular/core/testing';

import { EventTrackingService } from './event-tracking.service';

describe('EventTrackingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventTrackingService]
    });
  });

  it('should be created', inject([EventTrackingService], (service: EventTrackingService) => {
    expect(service).toBeTruthy();
  }));
});
