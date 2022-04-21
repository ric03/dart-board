import {TestBed} from '@angular/core/testing';

import {GameInitializationResolver} from '../app/services/game-initialization-resolver.service';

describe('GameInitializationResolver', () => {
  let resolver: GameInitializationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(GameInitializationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
