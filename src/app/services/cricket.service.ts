import {Injectable} from '@angular/core';
import {VictoryDialog, VictoryDialogData} from "../dialogTemplates/victory-dialog/victory-dialog.component";
import {Player, Throw} from '../models/player/player.model';
import {CurrentPlayerService} from "./current-player.service";
import {PlayerService} from "./player.service";
import {RoundCountService} from "./round-count.service";
import {MatDialog} from "@angular/material/dialog";
import {GameType} from "../models/enum/GameType";

@Injectable({
  providedIn: 'root'
})
export class CricketService {
  /** Hier muss man sich die ersten 3 Treffer merken für jedes element
   * also 15,16..20,Bull
   *
   * erst danach kann man punkten
   *
   * gewonnen hat der mit den meisten Punkten, nach erreichen des Rundenlimits
   * oder
   * derjenige der alles 3mal getroffen hat && die meisten Punkte hat
   *
   */
  playerNames: string[] = [];
  public _gameType: GameType | string = '';
  public _hideAll: boolean = false;


  static createPlayer(name: string, id: number): Player {
    return {
      id,
      name,
      remainingPoints: 0,
      lastScore: 0,
      history: [],
      cricketMap: new Map(),
      average: 0,
      last3History: [],
      throws: [],
    };
  }

  constructor(private playerService: PlayerService,
              private currentPlayerService: CurrentPlayerService,
              private dialog: MatDialog,
              private roundCountService: RoundCountService,
  ) {
  }

  setGameType(gameType: string) {
    this._gameType = gameType;
    this.currentPlayerService.setCurrentGameMode(gameType);
  }

  initPlayers(playerNames: string[]) {
    this.roundCountService.reset();
    this.playerNames = playerNames;
    this.playerService.setupCricketPlayers(playerNames);
    this._hideAll = false;
    this.currentPlayerService.init(this.playerService.getFirstPlayer());
  }

  // anpassen
  scoreCricketWithMultiplier(_throw: Throw) {
    if (this.roundCountService.getRemainingRounds() === 0) {
      this.displayRoundCountNotification();
    } else {
      this.currentPlayerService.scoreCricket(_throw);
      if (this.cricketWinCheck()) {
        this.handleVictory();
      } else if (this.currentPlayerService.hasNoThrowsRemaining()) {
        this.switchPlayer();
      }
    }
    this.currentPlayerService.sortMap();
  }

  private handleVictory() {
    this._hideAll = true;
    this.dialog.open(VictoryDialog, {disableClose: true});
    // TODO: Open PointsOverview as Option
  }

  private switchPlayer() {
    this.currentPlayerService.switchPlayer(
      this.playerService.getNextPlayer(this.currentPlayerService._currentPlayer.value), this.isNewRound());
    this.setCurrentPlayerAsFristofList();
  }


  private displayRoundCountNotification() {
    this._hideAll = true;
    this.handleVictoryByReachingRoundLimit();
  }

  private handleVictoryByReachingRoundLimit() {
    this.currentPlayerService._currentPlayer.next(this.getPlayerWithHighestScore());

    const data: VictoryDialogData = {victoryByReachingRoundLimit: true}
    this.dialog.open(VictoryDialog, {data, disableClose: true});
    // TODO: Open PointsOverview as Option
  }

  getPlayerWithHighestScore() {
    let arrOfPoints = this.playerService._players.flatMap(x => x.remainingPoints);
    const winner = this.playerService._players.filter((p1) => p1.remainingPoints == Math.max(...arrOfPoints));
    return winner[0]; // TODO consider a draw
  }


  isNewRound() {
    return this.currentPlayerService._currentPlayer.value.name == this.playerNames[this.playerNames.length - 1];
  }

  setCurrentPlayerAsFristofList() {
    const current = this.playerService._players.shift();
    this.playerService._players.push(current!);
  }

  /**
   * Der Spieler, der alle Felder ausgeworfen hat und dessen Punktzahl nicht geringer als die eines Gegners ist, gewinnt das Spiel.
   * Der Spieler, der die höchste Punktzahl nach dem Rundenlimit hat, gewinnt das Spiel.
   * Bei Punktgleichheit gewinnt der Spieler mit den meisten ausgeworfenen Feldern.
   * Falls die Anzahl der ausgeworfenen Felder ebenfalls gleich ist,
   * dann gibt es bis zu 10 mögliche zusätzliche Würfe, den Gewinner zu ermitteln.
   * @private
   */
  private cricketWinCheck() {
    // Gewinn-Regel : http://www.startspiele.de/hilfe/darts/game_rules_cricket.html
    if (this.playerHasAllClosed()) {
      if (this.currentPlayerService._currentPlayer.value == this.getPlayerWithHighestScore()
        || this.currentPlayerService._currentPlayer.value.remainingPoints >= this.getPlayerWithHighestScore().remainingPoints) {
        return true;
      }
    }
    return false;
  }

  private playerHasAllClosed() {
    return Array.from(this.currentPlayerService._currentPlayer.value.cricketMap.values()).every(value => value === 3)
      && this.currentPlayerService._currentPlayer.value.cricketMap.size == 7;
  }

}
