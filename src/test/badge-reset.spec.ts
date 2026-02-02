import {TestBed} from '@angular/core/testing';
import {CurrentPlayerService} from '../app/services/current-player.service';
import {BadgeHandleService} from '../app/services/badge-handle.service';
import {PlayerService} from '../app/services/player.service';
import {DartService} from '../app/services/dart.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('Badge Reset Test', () => {
  let currentPlayerService: CurrentPlayerService;
  let badgeHandleService: BadgeHandleService;
  let playerService: PlayerService;
  let dartService: DartService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, MatDialogModule, NoopAnimationsModule],
      providers: [
        CurrentPlayerService,
        BadgeHandleService,
        PlayerService,
        DartService,
      ]
    });

    currentPlayerService = TestBed.inject(CurrentPlayerService);
    badgeHandleService = TestBed.inject(BadgeHandleService);
    playerService = TestBed.inject(PlayerService);
    dartService = TestBed.inject(DartService);

    // Initialisierung von Spielern
    dartService.initPlayers(['Player 1', 'Player 2']);
  });

  it('should reset Bull and BullsEye badges when switching players', () => {
    // Setup Spieler
    const p1 = (playerService as any)._players[0];
    const p2 = (playerService as any)._players[1];
    currentPlayerService.init(p1);

    // Simuliere Bull Treffer
    badgeHandleService.matBadgeHiddenBull = false;
    badgeHandleService.bullBadgeCount = 1;

    // Simuliere BullsEye Treffer
    badgeHandleService.matBadgeHiddenBullsEye = false;
    badgeHandleService.bullsEyeBadgeCount = 2;

    expect(badgeHandleService.matBadgeHiddenBull).toBeFalse();
    expect(badgeHandleService.matBadgeHiddenBullsEye).toBeFalse();

    // Simuliere Spielerwechsel (nach 3 Würfen oder manuell)
    (dartService as any).switchPlayer();

    expect(badgeHandleService.matBadgeHiddenBull).toBeTrue();
    expect(badgeHandleService.matBadgeHiddenBullsEye).toBeTrue();
    expect(badgeHandleService.bullBadgeCount).toBeUndefined();
    expect(badgeHandleService.bullsEyeBadgeCount).toBeUndefined();
  });

  it('should restore badges correctly for Bull and Miss', () => {
    // Bull (25), Miss (0), BullsEye (50)
    badgeHandleService.restoreBadgesFromHistory([25, 0, 50]);

    expect(badgeHandleService.matBadgeHiddenBull).toBeFalse();
    expect(badgeHandleService.bullBadgeCount).toBe(1);

    expect(badgeHandleService.matBadgeHiddenMiss).toBeFalse();
    expect(badgeHandleService.missBadgeCount).toBe(2);

    expect(badgeHandleService.matBadgeHiddenBullsEye).toBeFalse();
    expect(badgeHandleService.bullsEyeBadgeCount).toBe(3);
  });

  it('should NOT show badges for a new player if the previous player finished with Bull', () => {
    // Setup: Zwei Spieler
    const p1 = (playerService as any)._players[0];
    const p2 = (playerService as any)._players[1];

    // Initialer Spieler setzen
    currentPlayerService.init(p1);

    // 1. Spieler 1 wirft Bull als 3. Wurf
    // In der Komponente würde scoreBull aufgerufen
    // scoreBull() {
    //   this.badgeHandleService.matBadgeHiddenBull = false;
    //   this.badgeHandleService.bullBadgeCount = this.getBadgeCountValue();
    //   this.setBadgeCount();
    //   this.dartService.score({value: 25, multiplier: 1});
    // }

    // Simuliere 2 vorangegangene Würfe
    dartService.score({value: 20, multiplier: 1});
    dartService.score({value: 20, multiplier: 1});

    // 3. Wurf (Bull)
    badgeHandleService.matBadgeHiddenBull = false;
    badgeHandleService.bullBadgeCount = 3;
    badgeHandleService.tempBadgeValue = 4;
    dartService.score({value: 25, multiplier: 1});

    // dartService.score hat switchPlayer ausgelöst -> p2 ist jetzt aktiv
    expect(currentPlayerService._currentPlayer.value.id).toBe(p2.id);

    // Das Badge für Player 2 sollte VERSTECKT sein (da switchPlayer resetBadges aufruft)
    expect(badgeHandleService.matBadgeHiddenBull).toBeTrue();
    expect(badgeHandleService.bullBadgeCount).toBeUndefined();
  });

  it('should show 3 badges if 3 throws are made', () => {
    // Setup: Ein Spieler
    const p1 = (playerService as any)._players[0];
    currentPlayerService.init(p1);

    // Initialisiere Buttons im Service, falls noch nicht geschehen (wie in OnInit der Komponente)
    if (badgeHandleService.twentyButtons.length === 0) {
      for (let i = 0; i < 20; i++) {
        badgeHandleService.twentyButtons.push({zahl: i + 1, badge: true});
      }
    }

    // 1. Wurf: 20
    const btn20 = badgeHandleService.twentyButtons.find(b => b.zahl === 20)!;
    btn20.badgeValue = 1;
    btn20.badge = false;
    badgeHandleService.tempBadgeValue = 2;
    dartService.score({value: 20, multiplier: 1});

    // 2. Wurf: Bull
    badgeHandleService.matBadgeHiddenBull = false;
    badgeHandleService.bullBadgeCount = 2;
    badgeHandleService.tempBadgeValue = 3;
    dartService.score({value: 25, multiplier: 1});

    // 3. Wurf: 19 (beendet den Turn)
    const btn19 = badgeHandleService.twentyButtons.find(b => b.zahl === 19)!;
    btn19.badgeValue = 3;
    btn19.badge = false;
    badgeHandleService.tempBadgeValue = 4;
    dartService.score({value: 19, multiplier: 1});

    // Jetzt wurde switchPlayer aufgerufen.
    // Die Badges sollten für Player 2 ZURÜCKGESETZT sein.
    expect(badgeHandleService.matBadgeHiddenBull).toBeTrue();
    expect(btn20.badge).toBeTrue();
    expect(btn19.badge).toBeTrue();
  });

  it('should restore all 3 badges when undo is called after a full turn', () => {
    // Setup
    const p1 = (playerService as any)._players[0];
    const p2 = (playerService as any)._players[1];
    currentPlayerService.init(p1);

    // Initialisiere Buttons
    if (badgeHandleService.twentyButtons.length === 0) {
      for (let i = 0; i < 20; i++) {
        badgeHandleService.twentyButtons.push({zahl: i + 1, badge: true});
      }
    }

    // 1. Wurf: 20
    badgeHandleService.tempBadgeValue = 1;
    const btn20 = badgeHandleService.twentyButtons.find(b => b.zahl === 20)!;
    btn20.badgeValue = 1;
    btn20.badge = false;
    badgeHandleService.tempBadgeValue = 2;
    dartService.score({value: 20, multiplier: 1});

    // 2. Wurf: 20
    btn20.badgeValue = 2;
    btn20.badge = false;
    badgeHandleService.tempBadgeValue = 3;
    dartService.score({value: 20, multiplier: 1});

    // 3. Wurf: 20
    btn20.badgeValue = 3;
    btn20.badge = false;
    badgeHandleService.tempBadgeValue = 4;
    dartService.score({value: 20, multiplier: 1});

    // Spielerwechsel sollte stattgefunden haben
    expect(currentPlayerService._currentPlayer.value.id).toBe(p2.id);
    expect(badgeHandleService.tempBadgeValue).toBe(1);
    expect(btn20.badge).toBeTrue();

    // Player 1 should have last3History saved
    expect(p1.last3History).toEqual([20, 20, 20]);

    // Undo aufrufen
    currentPlayerService.undoLastPlayerActions();

    // Zurück bei Spieler 1
    expect(currentPlayerService._currentPlayer.value.id).toBe(p1.id);
    expect(currentPlayerService._last3History).toEqual([20, 20, 20]);

    // Badges sollten wieder da sein
    expect(btn20.badge).toBeFalse();
    expect(btn20.badgeValue).toBe(3); // Der letzte Wert am Button 20 war 3
    expect(badgeHandleService.tempBadgeValue).toBe(4);
  });
});
