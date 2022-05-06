import {TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterTestingModule} from "@angular/router/testing";

import {QueryParamValidationGuard} from '../app/services/query-param-validation-guard.service';

describe('QueryParamValidationGuard', () => {
  let guard: QueryParamValidationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule],
      providers: [RouterTestingModule, MatSnackBarModule]
    });
    guard = TestBed.inject(QueryParamValidationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
