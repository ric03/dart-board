import {TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterTestingModule} from "@angular/router/testing";

import {queryParamValidationGuard} from '../app/services/query-param-validation-guard.service';

describe('queryParamValidationGuard', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, MatSnackBarModule],
      providers: []
    });
  });

  it('should be created', () => {
    expect(queryParamValidationGuard).toBeTruthy();
  });
});
