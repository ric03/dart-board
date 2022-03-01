import {Injectable} from '@angular/core';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import {MatDialog} from '@angular/material/dialog';
import {BehaviorSubject} from 'rxjs';
import {OvershotModalComponent} from '../modals/overshot-modal/overshot-modal.component';
import {QuitConfirmationModalComponent} from '../modals/quit-confirmation-modal/quit-confirmation-modal.component';
import {VictoryModalComponent} from '../modals/victory-modal/victory-modal.component';
import {Player} from './player.model';

@Injectable({
  providedIn: 'root'
})
export class DartCounterService {

  private readonly FIRST: Player = {id: 1, name: 'Player 1', remainingPoints: 501, dartCount: 3};

  private roundCount = 1;
  public points$: BehaviorSubject<number> = new BehaviorSubject(501);
  public dartCount$: BehaviorSubject<number> = new BehaviorSubject(3);
  public playerName$: BehaviorSubject<string> = new BehaviorSubject('Player 1');
  public roundCount$: BehaviorSubject<number> = new BehaviorSubject(1);
  private playerArr: Player[] = [];
  public playerArr$$: BehaviorSubject<Player[]> = new BehaviorSubject([this.FIRST, this.FIRST]);
  private tempPlayerPoints: number[] = [];

  private currentPlayer = this.FIRST;

  constructor(private bottomSheet: MatBottomSheet,
              private dialog: MatDialog,
  ) {
  }

  initPlayers(playerCount: number) {
    this.playerArr = [...Array(playerCount)]
      .map((_, index) => this.createPlayer501(index));
    console.log(this.playerArr)

    this.currentPlayer = this.playerArr[0];
    this.playerArr$$.next(this.playerArr);
  }

  reduceCountBy(points: number) {
    if (this.currentPlayer.dartCount > 1) {
      this.tempPlayerPoints.push(this.currentPlayer.remainingPoints);
    }
    if (this.currentPlayer.dartCount > 0) {
      this.currentPlayer.remainingPoints -= points;
    }
    this.reduceDartCount();
    this.points$.next(this.currentPlayer.remainingPoints);
  }

  reduceDartCount() {
    if ((this.currentPlayer.dartCount - 1) >= 0) {
      this.currentPlayer.dartCount -= 1;
      this.overshotCheck();
      this.winCheck();
    }
    if (this.currentPlayer.dartCount == 0) {
      this.changePlayer(this.currentPlayer.id);

    }
    this.playerName$.next(this.currentPlayer.name);
    this.dartCount$.next(this.currentPlayer.dartCount);
    return this.currentPlayer.dartCount;
  }

  changePlayer(id: number) {
    this.playerArr.forEach(player => {
      if (this.playerArr.length == id) {
        this.currentPlayer = this.playerArr[0];
        this.currentPlayer.name = this.playerArr[0].name;
      }
      if (player.id == id + 1) {
        this.currentPlayer = player;
        this.currentPlayer.name = player.name;
      }
    });
    if (this.currentPlayer.id == this.playerArr[0].id) {
      this.roundCountCheck();
      this.roundCount += 1
      this.roundCount$.next(this.roundCount);
    }
    this.currentPlayer.dartCount = 3;
    this.tempPlayerPoints = [];
  }

  winCheck() {
    if (this.currentPlayer.remainingPoints == 0 && this.currentPlayer.dartCount >= 0) {
      const botSheet = this.bottomSheet.open(VictoryModalComponent);
      botSheet.afterDismissed().subscribe(() => {
        this.dialog.open(QuitConfirmationModalComponent);
      });
    }
  }

  public overshotCheck(): void {
    // dartcounter begins at 3
    if (this.currentPlayer.remainingPoints < 0) {
      this.currentPlayer.remainingPoints = this.tempPlayerPoints[0];
      this.currentPlayer.dartCount = 0;
      this.bottomSheet.open(OvershotModalComponent, {
        ariaLabel: 'Overshot'
      });
      this.playerName$.next(this.currentPlayer.name);
    }
  }

  public roundCountCheck(): void {
    // dartcounter begins at 3
    if (this.roundCount > 45) {
      this.currentPlayer.dartCount = 0;
      this.dialog.open(QuitConfirmationModalComponent);
    }
  }

  private createPlayer501(id: number): Player {
    return {
      id,
      name: `Player ${id}`,
      remainingPoints: 501,
      dartCount: 3,
    };
  }
}

