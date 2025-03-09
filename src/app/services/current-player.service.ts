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


export const MAX_REMAINING_THROWS = 3;


@Injectable({
  providedIn: 'root'
})
export class CurrentPlayerService {
  private roundCountService = inject(RoundCountService);
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
  public _history: HistoryEntry[] = [];
  protected animationService = inject(ExplosionAnimationService)

  init(player: Player) {
    this._currentPlayer.next(player);
    this._remainingPointsToDisplay.set(this._currentPlayer.value.remainingPoints);
    this._averagePoints = player.average;
    this.reset()
  }

  switchPlayer(player: Player, isNewRound: boolean) {
    this.showPlayerSwitchSnackbar(player, isNewRound);
  }

  private showPlayerSwitchSnackbar(player: Player, isNewRound: boolean) {

    const snack = this.snackbar.openFromComponent(SwitchPlayerSnackComponent, {duration: 5000})
    snack.afterOpened().subscribe(() => {
      this.getAllButtonsToDisable(true);
    })

    snack.afterDismissed().subscribe(() => {
      if (this.isToResetRound) {
        this.resetRound();
        this.isToResetRound = false;
      } else {
        if (isNewRound) {
          this.roundCountService.incrementRoundCount();
        }
        this.getAllButtonsToDisable(false);
        this.animationService.tripleTwentyCounter = 0;
        this._currentPlayer.next(player);
        this._last3History = [];
        this._remainingPointsToDisplay.set(this._currentPlayer.value.remainingPoints);
        this._averagePoints = player.average;
        this._history = this._currentPlayer.value.history;
        this.reset();
      }
    })

  }

  private getAllButtonsToDisable(disabled: boolean) {
    // @ts-ignore
    for (const btn of document.getElementsByTagName("button")) {
      if (btn.innerText !== 'OK' && btn.innerText !== 'REVERT') {
        btn.disabled = disabled;
      }
    }
  }

  //TODO: implement revert
  revert() {
    console.log('revert');
    this.isToResetRound = true;

  }

  private resetRound() {
    this.resetAccumulatedPoints();
    this.resetThrows();
    this.roundCountService.decrementRoundCount();
    this._currentPlayer.value.last3History = [];
    this.getAllButtonsToDisable(false);
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
      // Nur zum Anzeigen der aktuellen Punktzahl
      this._remainingPointsToDisplay.update(value => value - points);
      this._last3History.push(points);
      this.accumulatePoints(points);
      this.decrementRemainingThrows();
    } else {
      // TODO: show error message, wird manchmal geworfen, wenn man 3 mal auf den Button drückt, verhindert damit aber nicht das Spiel nur den Click zuviel
      throw new Error('Unable to reduce below 0');
    }
  }

  scoreCricket(_throw: Throw) {
    if (this.hasThrowsRemaining()) {
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
    return expectedRemainingPoints < 0;
  }

  applyPoints() {
    this._currentPlayer.value.lastScore = this._accumulatedPoints;
    // Hier werden die Punkte tatsächlich vom Spieler abgezogen
    this._currentPlayer.value.remainingPoints -= this._accumulatedPoints;
    this._remainingPointsToDisplay.set(this._currentPlayer.value.remainingPoints);
    this.savePointsForStatistics();
    this.calcAverage();
  }

  applyCricketPoints() {
    this._currentPlayer.value.lastScore = this._accumulatedPoints;
    this._currentPlayer.value.remainingPoints += this._accumulatedPoints;
    this.savePointsForStatistics();
    this.calcAverage();

  }

  calcAverage() {
    let arr: number[] = [];
    this._currentPlayer.value.history.forEach((entry: HistoryEntry) => {
      entry.hits.forEach((hit: number) => {
        arr.push(hit);
      });
    });
    let leng = arr.length;
    if (leng > 0) {
      let sum = arr.reduce((a, b) => +a + +b);
      this._averagePoints = Math.round(sum / leng);
      this._currentPlayer.value.average = this._averagePoints;
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
    this._currentPlayer.value.last3History.push(_throw.value * _throw.multiplier);

  }

  sortMap() {
    this._currentPlayer.value.cricketMap = new Map([...this._currentPlayer.value.cricketMap].sort());
  }

  getHistory() {
    return this._currentPlayer.value.history.slice(-3).reverse();
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
    // Reset all throws since last player switch
    this._last3History = [];
    this._accumulatedPoints = 0;

    if (this.currentGameMode === 'Cricket') {


      // Hole die letzten 3 Würfe aus der Historie
      const lastThreeThrows = this._currentPlayer.value.last3History.slice(-3);

      // Für jeden Wurf die Änderungen rückgängig machen
      lastThreeThrows.forEach(throwValue => {
        const baseValue = throwValue > 25 ? 25 : throwValue; // Handle Bullseye
        const multiplier = throwValue > 25 ? 2 : 1;

        if (this._currentPlayer.value.cricketMap.has(baseValue)) {
          // Aktuelle Treffer für diesen Wert
          const currentHits = this._currentPlayer.value.cricketMap.get(baseValue) || 0;

          // Reduziere die Treffer, aber nicht unter 0
          const newHits = Math.max(0, currentHits - multiplier);
          this._currentPlayer.value.cricketMap.set(baseValue, newHits);

          // Wenn Punkte erzielt wurden, diese auch zurücknehmen
          if (currentHits >= 3) {
            this._currentPlayer.value.remainingPoints -= (baseValue * multiplier);
          }
        }
      });

      // Historie und andere Werte zurücksetzen
      this._currentPlayer.value.last3History =
        this._currentPlayer.value.last3History.slice(0, -3);
      this._last3History = [];
      this._accumulatedPoints = 0;
      this.sortMap();
      this._currentPlayer.value.remainingPoints = Math.max(0, this._currentPlayer.value.remainingPoints)
      this._remainingPointsToDisplay.set(this._currentPlayer.value.remainingPoints);
    } else {
      this._remainingPointsToDisplay.set(this._currentPlayer.value.remainingPoints);
    }

    // Reset throws to maximum
    this._remainingThrows = MAX_REMAINING_THROWS;

    // Reset badges
    this.badgeHandleService.resetBadges();
  }

  getLast3HistorySum(): number {
    return this._last3History.reduce((sum, current) => sum + current, 0);
  }
}
