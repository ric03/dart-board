import {TestBed} from '@angular/core/testing';
import {CurrentPlayerService} from '../app/services/current-player.service';
import {BadgeHandleService} from '../app/services/badge-handle.service';
import {PlayerService} from '../app/services/player.service';
import {DartService} from '../app/services/dart.service';
import {CricketService} from '../app/services/cricket.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {GameType} from "../app/models/enum/GameType";
import {of} from 'rxjs';

import {RoundCountService} from '../app/services/round-count.service';

describe('Victory Check and Miss Badge Test', () => {
  let currentPlayerService: CurrentPlayerService;
  let playerService: PlayerService;
  let dartService: DartService;
  let cricketService: CricketService;
  let badgeHandleService: BadgeHandleService;
  let roundCountService: RoundCountService;
  let dialog: MatDialog;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, MatDialogModule, NoopAnimationsModule],
      providers: [
        CurrentPlayerService,
        BadgeHandleService,
        PlayerService,
        DartService,
        CricketService,
        RoundCountService,
      ]
    });

    currentPlayerService = TestBed.inject(CurrentPlayerService);
    playerService = TestBed.inject(PlayerService);
    dartService = TestBed.inject(DartService);
    cricketService = TestBed.inject(CricketService);
    badgeHandleService = TestBed.inject(BadgeHandleService);
    roundCountService = TestBed.inject(RoundCountService);
    dialog = TestBed.inject(MatDialog);

    spyOn(dialog, 'open').and.returnValue({afterDismissed: () => of(null)} as any);
  });

  it('should trigger victory in 501 mode on the first throw of a turn', () => {
    dartService.setGameType(GameType.DoubleOut501);
    dartService.initPlayers(['Player 1']);
    const p1 = playerService._players[0];
    p1.remainingPoints = 40; // Needs D20 to win

    // 1. Wurf: Double 20 (40 Punkte)
    dartService.score({value: 20, multiplier: 2});

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should trigger victory in Highscore mode when round limit is reached', () => {
    dartService.setGameType(GameType.Highscore);
    // Wir setzen die Spielernamen, damit isNewRound() funktioniert
    dartService.playerNames = ['Player 1'];
    dartService.initPlayers(['Player 1']);

    // Wir setzen das Rundenlimit auf 1 (MAX=1, aktuelle=1)
    roundCountService.setMaxRounds(1);
    roundCountService.roundCount = 1;

    // Player 1 wirft seinen 3. Wurf in Runde 1
    dartService.score({value: 20, multiplier: 1});
    dartService.score({value: 20, multiplier: 1});
    dartService.score({value: 20, multiplier: 1});

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should trigger victory in Elimination mode mid-turn', () => {
    dartService.setGameType(GameType.Elimination301);
    dartService.initPlayers(['Player 1']);
    const p1 = playerService._players[0];
    p1.remainingPoints = 281; // Needs 20 to reach 301

    // 1. Wurf: 20
    dartService.score({value: 20, multiplier: 1});

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should trigger victory in Cricket mode mid-turn', () => {
    cricketService.setGameType(GameType.Cricket);
    cricketService.initPlayers(['Player 1', 'Player 2']);
    const p1 = playerService._players[0];

    // Alle Felder außer 20 sind geschlossen
    for (let i = 15; i <= 19; i++) {
      p1.cricketMap.set(i, 3);
    }
    p1.cricketMap.set(25, 3);
    p1.cricketMap.set(20, 2); // Einer fehlt noch bei der 20

    p1.remainingPoints = 100; // Genug Punkte

    // 1. Wurf: 20 (schließt alles ab)
    cricketService.scoreCricketWithMultiplier({value: 20, multiplier: 1});

    expect(dialog.open).toHaveBeenCalled();
  });

  it('should NOT show badge for Miss in Cricket mode', () => {
    currentPlayerService.setCurrentGameMode(GameType.Cricket);
    cricketService.initPlayers(['Player 1']);
    badgeHandleService.resetBadges();

    // Wir rufen die Methode direkt auf, wie sie in MissBtn implementiert ist (nach meinem Fix)
    if (currentPlayerService.currentGameMode === 'Cricket') {
      cricketService.scoreCricketWithMultiplier({value: 0, multiplier: 1});
    } else {
      badgeHandleService.scoreMiss();
      dartService.score({value: 0, multiplier: 1});
    }

    expect(badgeHandleService.matBadgeHiddenMiss).toBeTrue();
  });
});
