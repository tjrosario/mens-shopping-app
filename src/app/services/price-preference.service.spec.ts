import { TestBed, inject } from '@angular/core/testing';

import { PricePreferenceService } from './price-preference.service';

describe('PricePreferenceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PricePreferenceService]
    });
  });

  it('should be created', inject([PricePreferenceService], (service: PricePreferenceService) => {
    expect(service).toBeTruthy();
  }));
});
