import {TestBed} from '@angular/core/testing';
import {CurrentPlayerService} from "../app/services/current-player.service";
import {DartService} from "../app/services/dart.service";
import {PlayerService} from "../app/services/player.service";
import {RoundCountService} from "../app/services/round-count.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {GameType} from "../app/models/enum/GameType";
import {VictoryDialog} from "../app/dialogTemplates/victory-dialog/victory-dialog.component";
import {of} from "rxjs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterModule} from "@angular/router";

describe('DartService Integration', () => {
  let service: DartService;
  let dialog: MatDialog;
  let playerService: PlayerService;
  let currentPlayerService: CurrentPlayerService;
  let roundCountService: RoundCountService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
      ],
      providers: [
        DartService,
        PlayerService,
        CurrentPlayerService,
        RoundCountService,
        {provide: MatSnackBar, useValue: {open: () => ({afterDismissed: () => of(null)})}},
      ]
    });
    service = TestBed.inject(DartService);
    dialog = TestBed.inject(MatDialog);
    playerService = TestBed.inject(PlayerService);
    currentPlayerService = TestBed.inject(CurrentPlayerService);
    roundCountService = TestBed.inject(RoundCountService);

    spyOn(dialog, 'open').and.callThrough();
  });

  it('sollte den VictoryDialog öffnen, wenn ein Spieler 0 Punkte erreicht (Simple 501)', () => {
    service.setGameType(GameType.Simple501);
    service.initPlayers(['Player 1']);

    // Simuliere Spielstand kurz vor Sieg
    currentPlayerService._currentPlayer.value.remainingPoints = 20;

    service.score({value: 20, multiplier: 1});

    expect(dialog.open).toHaveBeenCalledWith(VictoryDialog, jasmine.objectContaining({disableClose: true}));
  });

  it('sollte den VictoryDialog öffnen, wenn das Rundenlimit erreicht wird', () => {
    service.setGameType(GameType.Simple501);
    service.initPlayers(['Player 1']);

    // Setze Rundenlimit auf 1 und verbrauche es
    roundCountService.setMaxRounds(1);
    roundCountService.roundCount = 1;
    currentPlayerService._remainingThrows = 0

    service.score({value: 10, multiplier: 1});

    expect(dialog.open).toHaveBeenCalledWith(VictoryDialog, jasmine.objectContaining({
      data: {victoryByReachingRoundLimit: true},
      disableClose: true
    }));
  });
});
