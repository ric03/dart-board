import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { QuitConfirmationDialog } from '../modals/quit-confirmation-dialog/quit-confirmation-dialog.component';
import { VictoryDialog } from "../modals/victory-dialog/victory-dialog.component";
import { GameType } from '../util/GameType';
import { CurrentPlayerService } from "./current-player.service";
import { Player } from './player.model';
import { PlayerService } from "./player.service";

@Injectable({
  providedIn: 'root'
})
export class DartService {
  multiplier: number = 1;

  static createPlayer(name: string, id: number): Player {
    return { id, name, remainingPoints: 501, lastScore: 0, history: [0] };
  }

  public _gameType: string = '';

  constructor(private playerService: PlayerService,
    private currentPlayerService: CurrentPlayerService,
    private dialog: MatDialog,
    private snackbar: MatSnackBar,
  ) {
  }

  setGameType(gameType: string) {
    this._gameType = gameType;
  }

  initPlayers(playerNames: string[]) {
    this.playerService.setupDartPlayers(playerNames);
    this.currentPlayerService.init(this.playerService.getFirstPlayer());
  }

  score(points: number) {
    if (this.currentPlayerService.isOvershot(points)) {
      this.displayOvershotNotification();
      this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
    } else {
      this.currentPlayerService.score(points);
      if (GameType.DoubleOut501 == this._gameType) {
        this.checksFor501DoubleOut(points, this.getMultiplier());
      } else {
        this.checksFor501(points);
      }
    }
  }

  private checksFor501(points: number) {
    if (this.currentPlayerService.hasReachedZeroPoints()) {
      this.currentPlayerService.applyPoints();
      this.handleVictory();
    } else {
      if (this.currentPlayerService.hasNoThrowsRemaining()) {
        this.currentPlayerService.applyPoints();
        this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
      }
    }
  }

  private checksFor501DoubleOut(points: number, multiplier: number) {
    if (this.currentPlayerService.hasReachedZeroPoints()) {
      if (this.currentPlayerService.isDoubleOut(multiplier)) {
        this.currentPlayerService.applyPoints();
        this.handleVictory();
      } else {
        this.displayOvershotNotification();
        this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
      }
    } else {
      if (this.currentPlayerService.hasNoThrowsRemaining()) {
        this.currentPlayerService.applyPoints();
        this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
      }
    }
  }

  private displayOvershotNotification() {
    const playerName = this.currentPlayerService._currentPlayer.name;
    this.snackbar.open(`Sorry ${playerName}, you have overshot. Switching players.`, 'OK', { duration: 3000 })
  }

  private async handleVictory() {
    this.dialog.open(VictoryDialog);
    // TO DO: Open PointsOverview as Option
    setTimeout(() => {
      this.dialog.closeAll();
      this.dialog.open(QuitConfirmationDialog);
    }, 4000);
  }

  getMultiplier() {
    return this.multiplier;
  }

  setMultiplier(multiplier: number) {
    this.multiplier = multiplier;
  }
}
