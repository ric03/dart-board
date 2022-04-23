import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { QuitConfirmationDialog } from '../dialogTemplates/quit-confirmation-dialog/quit-confirmation-dialog.component';
import { VictoryDialog } from "../dialogTemplates/victory-dialog/victory-dialog.component";
import { GameType } from '../modals/enum/GameType';
import { CurrentPlayerService } from "./current-player.service";
import { Player } from '../modals/player/player.model';
import { PlayerService } from "./player.service";

@Injectable({
  providedIn: 'root'
})
export class DartService {
  multiplier: number = 1;
  public _gameType: string = '';
  playerNames: string[] = [];
  roundCount: number = 1;

  static createPlayer(name: string, id: number): Player {
    return { id, name, remainingPoints: 501, lastScore: 0, history: [], cricketMap: new Map(), average: 0 };
  }

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
    this.playerNames = playerNames;
    this.playerService.setupDartPlayers(playerNames);
    this.roundCount = 1;
    this.currentPlayerService.init(this.playerService.getFirstPlayer());
  }

  score(points: number) {
    if (this.currentPlayerService.isOvershot(points)) {
      this.displayOvershotNotification();
      this.switchPlayer();
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
        this.switchPlayer();
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
        this.switchPlayer();
      }
    } else {
      if (this.currentPlayerService.hasNoThrowsRemaining()) {
        this.currentPlayerService.applyDartPoints();
        this.switchPlayer();

      }
    }
  }

  private switchPlayer() {
    this.inkrementRoundCount();
    this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
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

  inkrementRoundCount() {
    if (this.currentPlayerService._currentPlayer.name == this.playerNames[this.playerNames.length - 1]) {
      this.currentPlayerService._rounds = this.roundCount += 1
    }
  }
}
