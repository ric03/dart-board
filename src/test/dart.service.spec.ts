import {TestBed} from '@angular/core/testing';
import {DartService} from "../app/services/dart.service";

describe('DartService', () => {
  let service: DartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
