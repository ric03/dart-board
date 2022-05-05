import {TestBed} from '@angular/core/testing';
import {CricketService} from "../app/services/cricket.service";
import {DartService} from "../app/services/dart.service";

import {GameInitializationResolver} from '../app/services/game-initialization-resolver.service';

describe('GameInitializationResolver', () => {
  let resolver: GameInitializationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: DartService, useValue: null},
        {provide: CricketService, useValue: null}
      ]
    });
    resolver = TestBed.inject(GameInitializationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
