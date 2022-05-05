import {TestBed} from '@angular/core/testing';

import {QueryParamValidationGuard} from '../app/services/query-param-validation-guard.service';

describe('QueryParamValidationGuard', () => {
  let guard: QueryParamValidationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QueryParamValidationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
