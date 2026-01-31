import {TestBed} from '@angular/core/testing';
import {CurrentPlayerService} from "../app/services/current-player.service";
import {CricketService} from "../app/services/cricket.service";
import {PlayerService} from "../app/services/player.service";
import {RoundCountService} from "../app/services/round-count.service";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {VictoryDialog} from "../app/dialogTemplates/victory-dialog/victory-dialog.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GameType} from "../app/models/enum/GameType";
import {RouterModule} from "@angular/router";

describe('CricketService Integration', () => {
  let service: CricketService;
  let dialog: MatDialog;
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
        CricketService,
        PlayerService,
        CurrentPlayerService,
        RoundCountService,
      ]
    });
    service = TestBed.inject(CricketService);
    dialog = TestBed.inject(MatDialog);
    currentPlayerService = TestBed.inject(CurrentPlayerService);
    roundCountService = TestBed.inject(RoundCountService);

    spyOn(dialog, 'open').and.callThrough();
  });

  it('sollte den VictoryDialog öffnen, wenn ein Spieler in Cricket gewinnt', () => {
    service.setGameType(GameType.Cricket);
    service.initPlayers(['Player 1']);

    // Simuliere fast alle Felder geschlossen
    const player = currentPlayerService._currentPlayer.value;
    [15, 16, 17, 18, 19, 20].forEach(v => player.cricketMap.set(v, 3));
    player.cricketMap.set(25, 2);

    // Letzter Treffer auf Bull (25)
    service.scoreCricketWithMultiplier({value: 25, multiplier: 1});

    expect(dialog.open).toHaveBeenCalledWith(VictoryDialog, jasmine.objectContaining({disableClose: true}));
  });

  it('sollte den VictoryDialog öffnen, wenn das Rundenlimit in Cricket erreicht wird', () => {
    service.setGameType(GameType.Cricket);
    service.initPlayers(['Player 1']);

    roundCountService.setMaxRounds(1);
    roundCountService.roundCount = 1;

    service.scoreCricketWithMultiplier({value: 20, multiplier: 1});

    expect(dialog.open).toHaveBeenCalledWith(VictoryDialog, jasmine.objectContaining({
      data: {victoryByReachingRoundLimit: true},
      disableClose: true
    }));
  });
});
