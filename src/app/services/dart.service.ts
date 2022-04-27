import {Injectable} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {QuitConfirmationDialog} from '../dialogTemplates/quit-confirmation-dialog/quit-confirmation-dialog.component';
import {VictoryDialog} from "../dialogTemplates/victory-dialog/victory-dialog.component";
import {GameType} from '../models/enum/GameType';
import {Player} from '../models/player/player.model';
import {CurrentPlayerService} from "./current-player.service";
import {PlayerService} from "./player.service";
import {RoundCountService} from "./round-count.service";

@Injectable({
  providedIn: 'root'
})
export class DartService {
  multiplier: number = 1;
  public _gameType: string = '';
  private playerNames: string[] = [];
  public _hideAll: boolean = false;

  static createPlayer(name: string, id: number): Player {
    return {id, name, remainingPoints: 501, lastScore: 0, history: [], cricketMap: new Map(), average: 0};
  }

  constructor(private playerService: PlayerService,
              private currentPlayerService: CurrentPlayerService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private roundCountService: RoundCountService,
  ) {
  }

  setGameType(gameType: string) {
    this._gameType = gameType;
  }

  initPlayers(playerNames: string[]) {
    this.roundCountService.reset();
    this.playerNames = playerNames;
    this.playerService.setupDartPlayers(playerNames);
    this._hideAll = false;
    this.currentPlayerService.init(this.playerService.getFirstPlayer());
  }

  score(points: number) {
    if (this.roundCountService.getRemainingRounds() == 0) {
      this.displayRoundCountNotification();
    } else if (this.currentPlayerService.isOvershot(points)) {
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
    this.setCurrentPlayerAsFristofList();
    this.currentPlayerService.switchPlayer(this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer));
  }

  private displayDoubleOutFailNotification() {
    const playerName = this.currentPlayerService._currentPlayer.name;
    this.snackbar.open(`Sorry ${playerName}, you haven't end with double. Switching players.`, 'OK', {duration: 5000})
  }

  private displayOvershotNotification() {
    const playerName = this.currentPlayerService._currentPlayer.name;
    this.snackbar.open(`Sorry ${playerName}, you have overshot. Switching players.`, 'OK', {duration: 5000})
  }

  private displayRoundCountNotification() {
    const playerName = this.currentPlayerService._currentPlayer.name;
    this.handleVictoryRoundcount();
    this._hideAll = true;
    this.snackbar.open(`Sorry ${playerName}, you have reached the roundlimit of 45. Stopping game.`, 'OK', {duration: 7000})
    setTimeout(() => {
      this.dialog.closeAll();
      this.dialog.open(QuitConfirmationDialog);
    }, 4000);
  }

  private async handleVictoryRoundcount() {
    let arrOfPoints = this.playerService._players.flatMap(x => x.remainingPoints);
    var winner = this.playerService._players.filter((p1) => p1.remainingPoints == Math.min(...arrOfPoints));
    this.currentPlayerService._currentPlayer = winner[0];
    this.dialog.open(VictoryDialog);
    // TO DO: Open PointsOverview as Option
    setTimeout(() => {
      this.dialog.closeAll();
      this.dialog.open(QuitConfirmationDialog);
    }, 4000);
  }

  private async handleVictory() {
    this._hideAll = true;
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
      this.roundCountService.incrementRoundCount();
    }
  }

  setCurrentPlayerAsFristofList() {
    var current = this.playerService._players.shift();
    this.playerService._players.push(current!);
  }
}
