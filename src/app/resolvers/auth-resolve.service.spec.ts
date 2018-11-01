import { TestBed, inject } from '@angular/core/testing';

import { AuthResolveService } from './auth-resolve.service';

describe('AuthResolveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthResolveService]
    });
  });

  it('should be created', inject([AuthResolveService], (service: AuthResolveService) => {
    expect(service).toBeTruthy();
  }));
});
