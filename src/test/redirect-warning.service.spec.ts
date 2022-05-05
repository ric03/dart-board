import {TestBed} from '@angular/core/testing';

import {RedirectWarningService} from './redirect-warning.service';

describe('RedirectWarningService', () => {
  let service: RedirectWarningService;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [RedirectWarningService]});
    service = TestBed.inject(RedirectWarningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
