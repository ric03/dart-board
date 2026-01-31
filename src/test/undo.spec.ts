import {TestBed} from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {CurrentPlayerService} from "../app/services/current-player.service";
import {PlayerService} from "../app/services/player.service";
import {GameStoreService} from "../app/services/game-store.service";
import {RoundCountService} from "../app/services/round-count.service";
import {BadgeHandleService} from "../app/services/badge-handle.service";
import {Player} from "../app/models/player/player.model";
import {GameType} from "../app/models/enum/GameType";

describe('Undo Functionality', () => {
  let currentPlayerService: CurrentPlayerService;
  let playerService: PlayerService;
  let gameStore: GameStoreService;
  let roundCountService: RoundCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, MatDialogModule],
      providers: [
        CurrentPlayerService,
        PlayerService,
        GameStoreService,
        RoundCountService,
        BadgeHandleService
      ]
    });

    currentPlayerService = TestBed.inject(CurrentPlayerService);
    playerService = TestBed.inject(PlayerService);
    gameStore = TestBed.inject(GameStoreService);
    roundCountService = TestBed.inject(RoundCountService);
  });

  it('should undo a dart score in 501 mode', () => {
    const players: Player[] = [
      {
        id: 1,
        name: 'P1',
        remainingPoints: 501,
        lastScore: 0,
        history: [],
        cricketMap: new Map(),
        average: 0,
        last3History: []
      }
    ];
    playerService._players = players;
    currentPlayerService.setCurrentGameMode(GameType.Simple501);
    currentPlayerService.init(players[0]);

    const initialPoints = currentPlayerService._remainingPointsToDisplay();
    expect(initialPoints).toBe(501);

    currentPlayerService.scoreDart(20);
    expect(currentPlayerService._remainingPointsToDisplay()).toBe(481);
    expect(currentPlayerService._last3History).toEqual([20]);

    currentPlayerService.undoLastPlayerActions();
    expect(currentPlayerService._remainingPointsToDisplay()).toBe(501);
    expect(currentPlayerService._last3History).toEqual([]);

    currentPlayerService.scoreDart(25);
    expect(currentPlayerService._last3History).toEqual([25]);
  });

  it('should not show double hits after undo in 501 mode with multiple hits', () => {
    const players: Player[] = [
      {
        id: 1,
        name: 'P1',
        remainingPoints: 501,
        lastScore: 0,
        history: [],
        cricketMap: new Map(),
        average: 0,
        last3History: []
      }
    ];
    playerService._players = players;
    currentPlayerService.setCurrentGameMode(GameType.Simple501);
    currentPlayerService.init(players[0]);

    currentPlayerService.scoreDart(10);
    expect(currentPlayerService._last3History).toEqual([10]);

    currentPlayerService.undoLastPlayerActions();
    // Nach Undo von 10 sind wir wieder bei [].
    expect(currentPlayerService._last3History).toEqual([]);
  });

  it('should undo cricket score and maintain Map type', () => {
    const players: Player[] = [
      {
        id: 1,
        name: 'P1',
        remainingPoints: 0,
        lastScore: 0,
        history: [],
        cricketMap: new Map(),
        average: 0,
        last3History: []
      }
    ];
    playerService._players = players;
    currentPlayerService.setCurrentGameMode(GameType.Cricket);
    currentPlayerService.init(players[0]);

    currentPlayerService.scoreCricket({value: 20, multiplier: 1});
    expect(currentPlayerService._currentPlayer.value.cricketMap.get(20)).toBe(1);

    currentPlayerService.undoLastPlayerActions();
    expect(currentPlayerService._currentPlayer.value.cricketMap.get(20)).toBeUndefined();
    // Test if it is still a Map
    expect(currentPlayerService._currentPlayer.value.cricketMap instanceof Map).toBeTrue();
    expect(typeof currentPlayerService._currentPlayer.value.cricketMap.get === 'function').toBeTrue();

    // Verify it doesn't throw when calling get
    expect(() => currentPlayerService._currentPlayer.value.cricketMap.get(20)).not.toThrow();
  });

  it('should undo in Elimination mode', () => {
    const players: Player[] = [
      {
        id: 1,
        name: 'P1',
        remainingPoints: 0,
        lastScore: 0,
        history: [],
        cricketMap: new Map(),
        average: 0,
        last3History: []
      }
    ];
    playerService._players = players;
    currentPlayerService.setCurrentGameMode(GameType.Elimination301);
    currentPlayerService.init(players[0]);

    currentPlayerService.scoreDart(50);
    expect(currentPlayerService._remainingPointsToDisplay()).toBe(50);

    currentPlayerService.undoLastPlayerActions();
    expect(currentPlayerService._remainingPointsToDisplay()).toBe(0);
  });

  it('should undo in Highscore mode', () => {
    const players: Player[] = [
      {
        id: 1,
        name: 'P1',
        remainingPoints: 0,
        lastScore: 0,
        history: [],
        cricketMap: new Map(),
        average: 0,
        last3History: []
      }
    ];
    playerService._players = players;
    currentPlayerService.setCurrentGameMode(GameType.Highscore);
    currentPlayerService.init(players[0]);

    currentPlayerService.scoreDart(60);
    expect(currentPlayerService._remainingPointsToDisplay()).toBe(60);

    currentPlayerService.undoLastPlayerActions();
    expect(currentPlayerService._remainingPointsToDisplay()).toBe(0);
  });
});
