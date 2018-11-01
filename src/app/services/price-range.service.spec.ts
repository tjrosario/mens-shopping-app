import { TestBed, inject } from '@angular/core/testing';

import { PriceRangeService } from './price-range.service';

describe('PriceRangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceRangeService]
    });
  });

  it('should be created', inject([PriceRangeService], (service: PriceRangeService) => {
    expect(service).toBeTruthy();
  }));
});
