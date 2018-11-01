import { TestBed, inject } from '@angular/core/testing';

import { MailchimpService } from './mailchimp.service';

describe('MailchimpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MailchimpService]
    });
  });

  it('should be created', inject([MailchimpService], (service: MailchimpService) => {
    expect(service).toBeTruthy();
  }));
});
