import {TestBed} from '@angular/core/testing';

import {GameInitializationResolver} from '../app/services/game-initialization-resolver.service';

describe('GameInitializationResolver', () => {
  let resolver: GameInitializationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GameInitializationResolver);
  });

  xit('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
