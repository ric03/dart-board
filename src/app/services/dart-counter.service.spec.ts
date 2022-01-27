import { TestBed } from '@angular/core/testing';

import { DartCounterService } from './dart-counter.service';

describe('DartCounterService', () => {
  let service: DartCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DartCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
