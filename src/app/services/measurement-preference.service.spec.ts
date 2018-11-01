import { TestBed, inject } from '@angular/core/testing';

import { MeasurementPreferenceService } from './measurement-preference.service';

describe('MeasurementPreferenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeasurementPreferenceService]
    });
  });

  it('should be created', inject([MeasurementPreferenceService], (service: MeasurementPreferenceService) => {
    expect(service).toBeTruthy();
  }));
});
