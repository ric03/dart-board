import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { QuitConfirmationDialog } from '../modals/quit-confirmation-dialog/quit-confirmation-dialog.component';
import { VictoryDialog } from "../modals/victory-dialog/victory-dialog.component";
import { GameType } from '../util/GameType';
import { CurrentPlayerService } from "./current-player.service";
import { Player } from '../modals/player/player.model';
import { PlayerService } from "./player.service";

@Injectable({
  providedIn: 'root'
})
export class DartService {
  multiplier: number = 1;

  static createPlayer(name: string, id: number): Player {
    return { id, name, remainingPoints: 501, lastScore: 0, history: [0], cricketMap: new Map() };
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
    if (this._gameType == GameType.Cricket) {
      this.playerService.setupCricketPlayers(playerNames);
    } else {
      this.playerService.setupDartPlayers(playerNames);
    }
    this.currentPlayerService.init(this.playerService.getFirstPlayer());
  }

  score(points: number) {
    if (this.currentPlayerService.isOvershot(points)) {
      this.displayOvershotNotification();
      this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
    } else {
      this.currentPlayerService.scoreDart(points);
      if (GameType.DoubleOut501 == this._gameType) {
        this.checksFor501DoubleOut(this.getMultiplier());
      } else {
        this.checksFor501();
      }
    }
  }

  private checksFor501() {
    if (this.currentPlayerService.hasReachedZeroPoints()) {
      this.currentPlayerService.applyDartPoints();
      this.handleVictory();
    } else {
      if (this.currentPlayerService.hasNoThrowsRemaining()) {
        this.currentPlayerService.applyDartPoints();
        this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
      }
    }
  }

  private checksFor501DoubleOut(multiplier: number) {
    if (this.currentPlayerService.hasReachedZeroPoints()) {
      if (this.currentPlayerService.isDoubleOut(multiplier)) {
        this.currentPlayerService.applyDartPoints();
        this.handleVictory();
      } else {
        this.displayDoubleOutFailNotification();
        this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
      }
    } else {
      if (this.currentPlayerService.hasNoThrowsRemaining()) {
        this.currentPlayerService.applyDartPoints();
        this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
      }
    }
  }

  private displayDoubleOutFailNotification() {
    const playerName = this.currentPlayerService._currentPlayer.name;
    this.snackbar.open(`Sorry ${playerName}, you haven't end with double. Switching players.`, 'OK', { duration: 5000 })
  }

  private displayOvershotNotification() {
    const playerName = this.currentPlayerService._currentPlayer.name;
    this.snackbar.open(`Sorry ${playerName}, you have overshot. Switching players.`, 'OK', { duration: 5000 })
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
