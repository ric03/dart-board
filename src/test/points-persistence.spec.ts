import {TestBed} from '@angular/core/testing';
import {CurrentPlayerService} from '../app/services/current-player.service';
import {BadgeHandleService} from '../app/services/badge-handle.service';
import {PlayerService} from '../app/services/player.service';
import {DartService} from '../app/services/dart.service';
import {CricketService} from '../app/services/cricket.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {GameType} from "../app/models/enum/GameType";

describe('Points Persistence Test', () => {
  let currentPlayerService: CurrentPlayerService;
  let playerService: PlayerService;
  let dartService: DartService;
  let cricketService: CricketService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, MatDialogModule, NoopAnimationsModule],
      providers: [
        CurrentPlayerService,
        BadgeHandleService,
        PlayerService,
        DartService,
        CricketService,
      ]
    });

    currentPlayerService = TestBed.inject(CurrentPlayerService);
    playerService = TestBed.inject(PlayerService);
    dartService = TestBed.inject(DartService);
    cricketService = TestBed.inject(CricketService);
  });

  it('should persist points in 501 mode after a full turn', () => {
    dartService.setGameType(GameType.DoubleOut501);
    dartService.initPlayers(['Player 1', 'Player 2']);

    const p1 = (playerService as any)._players[0];
    const p2 = (playerService as any)._players[1];

    expect(p1.remainingPoints).toBe(501);

    // Player 1 throws 3 times 20
    dartService.score({value: 20, multiplier: 1}); // 1. Wurf
    dartService.score({value: 20, multiplier: 1}); // 2. Wurf
    dartService.score({value: 20, multiplier: 1}); // 3. Wurf -> Switch player

    expect(currentPlayerService._currentPlayer.value.id).toBe(p2.id);
    expect(p1.remainingPoints).toBe(501 - 60);
    expect(p1.lastScore).toBe(60);
  });

  it('should persist points in Highscore mode after a full turn', () => {
    dartService.setGameType(GameType.Highscore);
    dartService.initPlayers(['Player 1', 'Player 2']);

    const p1 = (playerService as any)._players[0];
    const p2 = (playerService as any)._players[1];

    expect(p1.remainingPoints).toBe(0);

    // Player 1 throws 3 times 20
    dartService.score({value: 20, multiplier: 1});
    dartService.score({value: 20, multiplier: 1});
    dartService.score({value: 20, multiplier: 1}); // Switch player

    expect(currentPlayerService._currentPlayer.value.id).toBe(p2.id);
    expect(p1.remainingPoints).toBe(60);
  });

  it('should persist points in Elimination 301 mode after a full turn', () => {
    dartService.setGameType(GameType.Elimination301);
    dartService.initPlayers(['Player 1', 'Player 2']);

    const p1 = (playerService as any)._players[0];
    const p2 = (playerService as any)._players[1];

    expect(p1.remainingPoints).toBe(0);

    // Player 1 throws 3 times 20
    dartService.score({value: 20, multiplier: 1});
    dartService.score({value: 20, multiplier: 1});
    dartService.score({value: 20, multiplier: 1}); // Switch player

    expect(currentPlayerService._currentPlayer.value.id).toBe(p2.id);
    expect(p1.remainingPoints).toBe(60);
  });

  it('should persist points in Cricket mode after a full turn and add points only after 3 hits', () => {
    cricketService.setGameType(GameType.Cricket);
    cricketService.initPlayers(['Player 1', 'Player 2']);

    const p1 = (playerService as any)._players[0];
    const p2 = (playerService as any)._players[1];

    expect(p1.remainingPoints).toBe(0);

    // Wurf 1: 20 -> 1 hit
    cricketService.scoreCricketWithMultiplier({value: 20, multiplier: 1});
    expect(p1.remainingPoints).toBe(0);
    expect(currentPlayerService._remainingPointsToDisplay()).toBe(0);
    expect(p1.cricketMap.get(20)).toBe(1);

    // Wurf 2: 20 Triple -> +3 hits = 4 hits total
    // 1 hit to close (reach 3), 1 remaining hit should give 20 points
    cricketService.scoreCricketWithMultiplier({value: 20, multiplier: 3});
    expect(p1.cricketMap.get(20)).toBe(3);
    // Erwartung: 20 in p1.remainingPoints (da sofort angewendet), 20 in Display
    expect(p1.remainingPoints).toBe(20);
    expect(currentPlayerService._remainingPointsToDisplay()).toBe(20);

    // Wurf 3: 20 Single -> +1 hit = 5 hits total
    cricketService.scoreCricketWithMultiplier({value: 20, multiplier: 1}); // Switch player
    expect(currentPlayerService._currentPlayer.value.id).toBe(p2.id);

    // Erwartung: 20 + 20 + 20 = 60 Punkte permanent gespeichert
    expect(p1.remainingPoints).toBe(60);
  });

  it('should NOT add points in Cricket if all opponents have also closed the number', () => {
    cricketService.setGameType(GameType.Cricket);
    cricketService.initPlayers(['Player 1', 'Player 2']);

    const p1 = (playerService as any)._players[0];
    const p2 = (playerService as any)._players[1];

    // Player 2 schließt die 20
    p2.cricketMap.set(20, 3);

    // Player 1 hat die 20 bereits geschlossen (3 hits)
    p1.cricketMap.set(20, 3);
    p1.remainingPoints = 0;

    currentPlayerService.init(p1);

    // Player 1 wirft eine 20
    cricketService.scoreCricketWithMultiplier({value: 20, multiplier: 1});

    // Erwartung: Keine Punkte, da Player 2 die 20 auch geschlossen hat
    expect(currentPlayerService._accumulatedPoints).toBe(0);
    expect(currentPlayerService._remainingPointsToDisplay()).toBe(0);
  });

  it('should only close the number and NOT score if the opponent has also closed it', () => {
    cricketService.setGameType(GameType.Cricket);
    cricketService.initPlayers(['Player 1', 'Player 2']);

    const p1 = (playerService as any)._players[0];
    const p2 = (playerService as any)._players[1];

    // Player 2 hat die 20 bereits geschlossen
    p2.cricketMap.set(20, 3);

    currentPlayerService.init(p1);

    // Player 1 wirft Triple 20.
    // 3 Hits zum Schließen der 20, aber keine Punkte, weil p2 sie auch schon geschlossen hat.
    cricketService.scoreCricketWithMultiplier({value: 20, multiplier: 3});

    expect(p1.cricketMap.get(20)).toBe(3);
    expect(currentPlayerService._accumulatedPoints).toBe(0);
    expect(currentPlayerService._remainingPointsToDisplay()).toBe(0);
  });
});
