import {Injectable} from '@angular/core';
import {VictoryDialog, VictoryDialogData} from "../dialogTemplates/victory-dialog/victory-dialog.component";
import {GameType} from '../models/enum/GameType';
import {Player, Throw} from '../models/player/player.model';
import {CurrentPlayerService} from "./current-player.service";
import {PlayerService} from "./player.service";
import {RoundCountService} from "./round-count.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class DartService {
  _gameType: GameType | string = '';
  playerNames: string[] = [];
  public _hideAll: boolean = false;

  static createPlayer(name: string, id: number): Player {
    return {
      id,
      name,
      remainingPoints: 501,
      lastScore: 0,
      history: [],
      cricketMap: new Map(),
      average: 0,
      last3History: [],
    };
  }

  constructor(private playerService: PlayerService,
              private currentPlayerService: CurrentPlayerService,
              private dialog: MatDialog,
              private snackbar: MatSnackBar,
              private roundCountService: RoundCountService,
  ) {
  }

  setGameType(gameType: GameType) {
    this._gameType = gameType;
    this.currentPlayerService.setCurrentGameMode(gameType);
  }

  initPlayers(playerNames: string[]) {
    this.roundCountService.reset();
    this.playerNames = playerNames;
    this.playerService.setupDartPlayers(playerNames);

    // Initialize starting points based on game type
    if (this._gameType === GameType.Elimination301 || this._gameType === GameType.Highscore) {
      // Elimination/Highscore starts at 0 points and counts upwards
      this.playerService._players.forEach(p => p.remainingPoints = 0);
    } else {
      // Ensure 501 start for classic modes
      this.playerService._players.forEach(p => p.remainingPoints = 501);
    }

    this._hideAll = false;
    this.currentPlayerService.init(this.playerService.getFirstPlayer());
  }

  score(_throw: Throw) {
    const points = _throw.value * _throw.multiplier;

    if (this.roundCountService.getRemainingRounds() == 0 && this.isNewRound()) {
      this.displayRoundCountNotification();
      return;
    }

    if (this._gameType === GameType.Elimination301) {
      this.scoreElimination(points);
      return;
    }

    if (this._gameType === GameType.Highscore) {
      this.scoreHighscore(points);
      return;
    }

    if (this.currentPlayerService.isOvershot(points)) {
      this.displayOvershotNotification().afterDismissed().subscribe(() => {
        this.switchPlayer();
      })
    } else {
      this.currentPlayerService.scoreDart(points);
      if (GameType.DoubleOut501 == this._gameType) {
        this.checksFor501DoubleOut(_throw.multiplier);
      } else {
        this.checksFor501();
      }
    }
  }

  private checksFor501() {
    if (this.currentPlayerService.hasReachedZeroPoints()) {
      this.currentPlayerService.applyPoints();
      this.handleVictory();
    } else {
      if (this.currentPlayerService.hasNoThrowsRemaining()) {
        this.currentPlayerService.applyPoints();
        this.switchPlayer();
      }
    }
  }

  private scoreHighscore(points: number) {
    this.currentPlayerService.scoreDart(points);
    if (this.currentPlayerService.hasNoThrowsRemaining()) {
      this.currentPlayerService.applyPoints();
      if (this.roundCountService.getRemainingRounds() == 0 && this.isNewRound()) {
        this.displayRoundCountNotification();
      } else {
        this.switchPlayer();
      }
    }
  }

  private scoreElimination(points: number) {
    // Add points for current throw to the display/accumulator
    this.currentPlayerService.scoreDart(points);

    // Determine target based on elimination mode
    const target = 301;

    // Potential total points after this throw (not yet applied to player)
    const current = this.currentPlayerService._currentPlayer.value;
    const potentialTotal = current.remainingPoints + this.currentPlayerService._accumulatedPoints;

    // Equalization rule: if potential total equals any other player's current total, reset that other to 0
    this.playerService._players
      .filter(p => p.id !== current.id)
      .forEach(p => {
        if (p.remainingPoints === potentialTotal) {
          p.remainingPoints = 0;
        }
      });

    // Check immediate win at target or overshoot
    if (potentialTotal == target) {
      this.currentPlayerService.applyPoints();
      this.handleVictory();
      return;
    }
    if (potentialTotal > target) {
      this.displayOvershotNotification().afterDismissed().subscribe(() => {
        this.switchPlayer();
      })
      return;
    }

    // End of turn handling
    if (this.currentPlayerService.hasNoThrowsRemaining()) {
      this.currentPlayerService.applyPoints();
      this.switchPlayer();
    }
  }

  private checksFor501DoubleOut(multiplier: number) {
    if (this.currentPlayerService.hasReachedZeroPoints()) {
      if (this.currentPlayerService.isDoubleOut(multiplier)) {
        this.currentPlayerService.applyPoints();
        this.handleVictory();
      } else {
        this.displayDoubleOutFailNotification().afterDismissed().subscribe(() => {
          this.switchPlayer();
        })
      }
    } else {
      if (this.currentPlayerService.hasNoThrowsRemaining()) {
        this.currentPlayerService.applyPoints();
        this.switchPlayer();
      }
    }
  }

  private switchPlayer() {
    this.currentPlayerService.switchPlayer(
      this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer.value),
      this.isNewRound());
    this.setCurrentPlayerAsFristofList();
  }


  private displayDoubleOutFailNotification() {
    const playerName = this.currentPlayerService._currentPlayer.value.name;
    return this.snackbar.open(`Sorry ${playerName}, you haven't end with double. Switching players.`, 'OK', {
      duration: 2000,
      verticalPosition: 'top'
    })
  }

  private displayOvershotNotification() {
    const playerName = this.currentPlayerService._currentPlayer.value.name;
    return this.snackbar.open(`Sorry ${playerName}, you have overshot. Switching players.`, 'OK', {
      duration: 2000,
      verticalPosition: 'top'
    })
  }

  private displayRoundCountNotification() {
    this._hideAll = true;
    this.handleVictoryByReachingRoundLimit();
  }

  private handleVictoryByReachingRoundLimit() {
    const arrOfPoints = this.playerService._players.flatMap(x => x.remainingPoints);
    const isEliminationMode = (this._gameType === GameType.Elimination301 || this._gameType === GameType.Highscore);
    const comparator = isEliminationMode ? Math.max : Math.min;
    const target = comparator(...arrOfPoints);
    const winner = this.playerService._players.filter((p1) => p1.remainingPoints == target);
    this.currentPlayerService._currentPlayer.next(winner[0]); // TODO consider a draw

    const data: VictoryDialogData = {victoryByReachingRoundLimit: true}
    this.dialog.open(VictoryDialog, {data, disableClose: true});
    // TODO: Open PointsOverview as Option
  }

  private handleVictory() {
    this._hideAll = true;
    this.dialog.open(VictoryDialog, {disableClose: true});
    // TODO: Open PointsOverview as Option
  }

  isNewRound() {
    return this.currentPlayerService._currentPlayer.value.name == this.playerNames[this.playerNames.length - 1];
  }

  setCurrentPlayerAsFristofList() {
    const current = this.playerService._players.shift();
    this.playerService._players.push(current!);
  }

}
