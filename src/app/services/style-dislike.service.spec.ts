import { TestBed, inject } from '@angular/core/testing';

import { StyleDislikeService } from './style-dislike.service';

describe('StyleDislikeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StyleDislikeService]
    });
  });

  it('should be created', inject([StyleDislikeService], (service: StyleDislikeService) => {
    expect(service).toBeTruthy();
  }));
});
