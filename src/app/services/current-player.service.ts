import {inject, Injectable, signal} from '@angular/core';
import {PlayerService} from './player.service';
import {DEFAULT_PLAYER, HistoryEntry, Player, Throw} from "../models/player/player.model";
import {SwitchPlayerSnackComponent} from "../dialogTemplates/switch-player-snack/switch-player-snack.component";
import {BehaviorSubject} from "rxjs";
import {HistoryDialog, HistoryDialogData} from "../dialogTemplates/history-dialog/history-dialog.component";
import {RoundCountService} from "./round-count.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BadgeHandleService} from "./badge-handle.service";
import {ExplosionAnimationService} from "../shared/animation/explosion-animation.service";
import {GameType} from "../models/enum/GameType";
import {GameStoreService} from "./game-store.service";
import {Game} from "../models/game/game.model";


export const MAX_REMAINING_THROWS = 3;


@Injectable({
  providedIn: 'root'
})
export class CurrentPlayerService {
  private roundCountService = inject(RoundCountService);
  private gameStore = inject(GameStoreService);
  private isToResetRound: boolean = false;
  currentGameMode = ""

  constructor(private playerService: PlayerService,
              private snackbar: MatSnackBar,
              private dialog: MatDialog,
              private badgeHandleService: BadgeHandleService) {
  }

  public _remainingThrows = MAX_REMAINING_THROWS;
  public _accumulatedPoints = 0;
  public _remainingPointsToDisplay = signal(0);
  public _averagePoints = 0;
  public _currentPlayer: BehaviorSubject<Player> = new BehaviorSubject(DEFAULT_PLAYER);
  public _last3History: number[] = [];
  public _lastTurnSum = 0;
  public _lastTurnHits: number[] = [];
  public _lastCricketHistory: Map<number, number> = new Map();
  public _history: HistoryEntry[] = [];
  protected animationService = inject(ExplosionAnimationService)

  init(player: Player) {
    this._currentPlayer.next(player);
    this._remainingPointsToDisplay.set(this._currentPlayer.value.remainingPoints);
    this._averagePoints = player.average;
    this._lastCricketHistory = new Map(this._currentPlayer.value.cricketMap);
    this.reset();

    // Initialen Snapshot im Store speichern
    this.gameStore.initGame(this.currentGameMode as GameType, this.playerService._players);
  }

  getCurrentGameState(): Game {
    return {
      gameType: this.currentGameMode as GameType,
      players: this.playerService._players,
      currentPlayerIndex: this.playerService._players.indexOf(this._currentPlayer.value),
      roundCount: this.roundCountService.roundCount,
      remainingThrows: this._remainingThrows,
      accumulatedPoints: this._accumulatedPoints
    };
  }

  captureState() {
    this.gameStore.saveSnapshot(this.getCurrentGameState());
  }

  setCurrentGameMode(mode: string) {
    this.currentGameMode = mode;
  }

  switchPlayer(player: Player, isNewRound: boolean) {
    // Workflow-Optimierung: Sofortiger Wechsel im Zustand, Snackbar nur zur Info
    if (isNewRound) {
      this.roundCountService.incrementRoundCount();
    }
    this.animationService.tripleTwentyCounter = 0;

    // Daten für die Snackbar sichern, bevor sie zurückgesetzt werden
    this._lastTurnSum = this.getLast3HistorySum();
    this._lastTurnHits = [...this._last3History];

    this._currentPlayer.next(player);
    this._last3History = [];
    this._lastCricketHistory = new Map(this._currentPlayer.value.cricketMap);
    this._remainingPointsToDisplay.set(this._currentPlayer.value.remainingPoints);
    this._averagePoints = player.average;
    this._history = this._currentPlayer.value.history;
    this.reset();

    this.captureState();

    this.snackbar.openFromComponent(SwitchPlayerSnackComponent, {
      duration: 2000,
      panelClass: ['app-shape-morph-snack'],
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

  private resetRound() {
    this.resetAccumulatedPoints();
    this.resetThrows();
    this.roundCountService.decrementRoundCount();
    this._currentPlayer.value.last3History = [];
    this.captureState();
  }

  private savePointsForStatistics() {
    let playerHistory: HistoryEntry = {sum: 0, hits: []};
    playerHistory.sum = this._accumulatedPoints;
    playerHistory.hits.push(...this._last3History);

    this._currentPlayer.value.history.push(playerHistory);
  }

  private reset() {
    this.resetAccumulatedPoints();
    this.resetThrows();
    this._last3History = [];
    this._currentPlayer.value.last3History = [];
    this.badgeHandleService.resetBadges()
  }

  private resetAccumulatedPoints() {
    this._accumulatedPoints = 0;
  }

  private resetThrows() {
    this._remainingThrows = MAX_REMAINING_THROWS;
  }

  scoreDart(points: number) {
    if (this.hasThrowsRemaining()) {
      this.calcAverage();
      const currentPlayer = this._currentPlayer.value;
      this._currentPlayer.value.last3History = [...this._last3History];
      this.captureState();
      // Sicherstellen, dass die Referenz im Signal-ähnlichen BehaviorSubject erhalten bleibt
      this._currentPlayer.next(currentPlayer);

      // Nur zum Anzeigen der aktuellen Punktzahl
      if (this.currentGameMode === GameType.Elimination301 || this.currentGameMode === GameType.Highscore) {
        this._remainingPointsToDisplay.update(value => value + points);
      } else {
        this._remainingPointsToDisplay.update(value => value - points);
      }
      this._last3History.push(points);
      this.accumulatePoints(points);
      this.decrementRemainingThrows();
    } else {
      throw new Error('Unable to reduce below 0');
    }
  }

  scoreCricket(_throw: Throw) {
    if (this.hasThrowsRemaining()) {
      this.calcAverage();
      this._currentPlayer.value.last3History = [...this._last3History];
      this.captureState();
      this.evaluateCricketPoints(_throw);
      this._remainingPointsToDisplay.update(value => value = this._currentPlayer.value.remainingPoints);
      this.decrementRemainingThrows();
    } else {
      throw new Error('Unable to reduce throws below 0');
    }
  }

  private hasThrowsRemaining(): boolean {
    return this._remainingThrows > 0;
  }

  private accumulatePoints(points: number) {
    this._accumulatedPoints += points;
  }

  private accumulateCricketPoints(_throw: Throw) {
    if (this.checkForClosedHit(_throw)) {
      this._accumulatedPoints = _throw.value * _throw.multiplier;
    }
  }

  private decrementRemainingThrows() {
    this._remainingThrows -= 1;
  }

  hasNoThrowsRemaining(): boolean {
    return !this.hasThrowsRemaining();
  }

  hasReachedZeroPoints(): boolean {
    const aggregatedRemainingPoints = this._currentPlayer.value.remainingPoints - this._accumulatedPoints;
    return aggregatedRemainingPoints == 0;
  }

  isOvershot(points: number): boolean {
    const expectedRemainingPoints = this._currentPlayer.value.remainingPoints - this._accumulatedPoints - points;
    if (this.currentGameMode === GameType.DoubleOut501) {
      return expectedRemainingPoints < 0 || expectedRemainingPoints === 1;
    }
    return expectedRemainingPoints < 0;
  }

  applyPoints() {
    this._currentPlayer.value.lastScore = this._accumulatedPoints;
    if (this.currentGameMode === GameType.Elimination301 || this.currentGameMode === GameType.Highscore) {
      // Punkte hinzufügen (Elimination / Highscore)
      this._currentPlayer.value.remainingPoints += this._accumulatedPoints;
    } else {
      // Hier werden die Punkte tatsächlich vom Spieler abgezogen (501)
      this._currentPlayer.value.remainingPoints -= this._accumulatedPoints;
    }
    this._remainingPointsToDisplay.set(this._currentPlayer.value.remainingPoints);
    this.savePointsForStatistics();

    this.captureState();
  }

  applyCricketPoints() {
    this._currentPlayer.value.lastScore = this._accumulatedPoints;
    this._currentPlayer.value.remainingPoints += this._accumulatedPoints;
    this.savePointsForStatistics();

    this.captureState();
  }

  /**
   * Average(Dart): Gesamtpunktzahl eines Spielers durch die Anzahl der geworfenen Darts teilen und das Ergebnis mit 3 multiplizieren
   * Average(Cricket): Gesamtpunktzahl aller Runden durch die Anzahl der Runden teilen
   */
  calcAverage() {
    if (this.currentGameMode !== GameType.Cricket) {
      let arr: number[] = [];
      console.log(this._currentPlayer.value.history)
      this._currentPlayer.value.history.forEach((entry: HistoryEntry) => {
        entry.hits.forEach((hit: number) => {
          arr.push(hit);
        });
      });
      let geworfeneDarts = arr.length;
      if (geworfeneDarts > 0) {
        let gesamtPunktzahl = arr.reduce((a, b) => +a + +b);
        this._averagePoints = Math.round((gesamtPunktzahl / geworfeneDarts) * 3);
        this._currentPlayer.value.average = this._averagePoints;
      }
    } else {
      if (this._currentPlayer.value.cricketMap.size > 0) {
        this._currentPlayer.value.average = Math.round(this._currentPlayer.value.remainingPoints / this._currentPlayer.value.cricketMap.size);
      }
    }
  }

  isDoubleOut(multiplier: number): boolean {
    return multiplier / 2 == 1;
  }

  evaluateCricketPoints(_throw: Throw) {
    let map = this._currentPlayer.value.cricketMap;
    if (_throw.value > 0) { // kein Miss also Treffer

      if (map.has(_throw.value)) {// wenn der Wert schon im Map ist, heißt schon einmal getroffen

        let multiplierFromMap = map.get(_throw.value);
        let accumulatedMultiplier = multiplierFromMap! + _throw.multiplier;

        if (accumulatedMultiplier == 3 || accumulatedMultiplier < 3) {
          map.set(_throw.value, accumulatedMultiplier);
        }
        if (accumulatedMultiplier > 3) {
          map.set(_throw.value, 3);

          //bullseye
          if (_throw.value == 25 && _throw.multiplier == 2) {
            _throw.multiplier = accumulatedMultiplier - 2;
          }
          _throw.multiplier = accumulatedMultiplier - 3;
          this.accumulateCricketPoints(_throw);
          this.applyCricketPoints();
        }
      } else {// wenn der wert noch nicht im Map ist, füge ihn hinzu
        map.set(_throw.value, _throw.multiplier);
      }
    }
    this.sortMap();
    this._currentPlayer.value.throws?.push(_throw)
    this._currentPlayer.value.last3History.push(_throw.value * _throw.multiplier);

  }

  sortMap() {
    this._currentPlayer.value.cricketMap = new Map([...this._currentPlayer.value.cricketMap].sort());
  }

  checkForClosedHit(_throw: Throw) {
    if (this.playerService._players.length < 2) {
      return true;
    }

    return this.playerService._players.some((player: Player) =>
      player.cricketMap.get(_throw.value) !== 3)
  }

  showHistory(player?: Player) {
    const data: HistoryDialogData = {
      player: this.playerService.getPlayer(player ?? this._currentPlayer.value),
    }
    if (data.player.history.length > 0) {
      this.dialog.open(HistoryDialog, {data});
    }

  }

  undoLastPlayerActions() {
    const prevState = this.gameStore.undo();
    if (prevState) {
      this.applyState(prevState);
    }
  }

  private applyState(state: Game) {
    this.playerService._players = state.players;
    const currentPlayer = this.playerService._players[state.currentPlayerIndex];
    // WICHTIG: Den Referenz-Check im PlayerService-Array machen
    this._currentPlayer.next(currentPlayer);

    this.roundCountService.roundCount = state.roundCount;
    this._remainingThrows = state.remainingThrows;
    this._accumulatedPoints = state.accumulatedPoints;
    this._remainingPointsToDisplay.set(currentPlayer.remainingPoints);
    this._averagePoints = currentPlayer.average;
    this._history = currentPlayer.history;
    this._last3History = [...(currentPlayer.last3History || [])];
    this._lastCricketHistory = new Map(currentPlayer.cricketMap);
    this.badgeHandleService.restoreBadgesFromHistory(this._last3History);
  }

  getLast3HistorySum(): number {
    return this._last3History.reduce((sum, current) => sum + current, 0);
  }
}
