import { TestBed, inject } from '@angular/core/testing';

import { BrandDislikeService } from './brand-dislike.service';

describe('BrandDislikeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandDislikeService]
    });
  });

  it('should be created', inject([BrandDislikeService], (service: BrandDislikeService) => {
    expect(service).toBeTruthy();
  }));
});
