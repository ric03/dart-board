import {TestBed} from '@angular/core/testing';

import {CurrentPlayerService} from '../app/services/current-player.service';
import {PlayerService} from "../app/services/player.service";

describe('CurrentPlayerService', () => {
  let service: CurrentPlayerService;
  let playerService: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrentPlayerService, PlayerService]
    });
    service = TestBed.inject(CurrentPlayerService);
    playerService = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get players with highest points', () => {
    playerService._players = [
      {id: 1, name: 'P1', remainingPoints: 100} as any,
      {id: 2, name: 'P2', remainingPoints: 200} as any,
      {id: 3, name: 'P3', remainingPoints: 200} as any,
    ];

    const winners = service.getPlayersWithHighestPoints();
    expect(winners).toEqual(['P2', 'P3']);
  });

  it('should return empty array if no players', () => {
    playerService._players = [];
    const winners = service.getPlayersWithHighestPoints();
    expect(winners).toEqual([]);
  });
});
