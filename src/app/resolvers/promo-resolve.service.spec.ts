import { TestBed, inject } from '@angular/core/testing';

import { PromoResolveService } from './promo-resolve.service';

describe('PromoResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromoResolveService]
    });
  });

  it('should be created', inject([PromoResolveService], (service: PromoResolveService) => {
    expect(service).toBeTruthy();
  }));
});
