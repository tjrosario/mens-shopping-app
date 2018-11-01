import { TestBed, inject } from '@angular/core/testing';

import { HeightService } from './height.service';

describe('HeightService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeightService]
    });
  });

  it('should be created', inject([HeightService], (service: HeightService) => {
    expect(service).toBeTruthy();
  }));
});
