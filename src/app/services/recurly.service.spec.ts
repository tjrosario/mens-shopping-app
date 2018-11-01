import { TestBed, inject } from '@angular/core/testing';

import { RecurlyService } from './recurly.service';

describe('RecurlyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecurlyService]
    });
  });

  it('should be created', inject([RecurlyService], (service: RecurlyService) => {
    expect(service).toBeTruthy();
  }));
});
