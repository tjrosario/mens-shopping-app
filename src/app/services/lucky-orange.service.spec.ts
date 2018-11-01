import { TestBed, inject } from '@angular/core/testing';

import { LuckyOrangeService } from './lucky-orange.service';

describe('LuckyOrangeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LuckyOrangeService]
    });
  });

  it('should be created', inject([LuckyOrangeService], (service: LuckyOrangeService) => {
    expect(service).toBeTruthy();
  }));
});
