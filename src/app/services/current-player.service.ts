import {inject, Injectable} from '@angular/core';
import {PlayerService} from './player.service';
import {DEFAULT_PLAYER, HistoryEntry, Player} from "../models/player/player.model";
import {SwitchPlayerSnackComponent} from "../dialogTemplates/switch-player-snack/switch-player-snack.component";
import {BehaviorSubject} from "rxjs";
import {HistoryDialog, HistoryDialogData} from "../dialogTemplates/history-dialog/history-dialog.component";
import {RoundCountService} from "./round-count.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";


export const MAX_REMAINING_THROWS = 3;


@Injectable({
  providedIn: 'root'
})
export class CurrentPlayerService {
  private roundCountService = inject(RoundCountService);
  private isToResetRound: boolean = false

  constructor(private playerService: PlayerService, private snackbar: MatSnackBar, private dialog: MatDialog) {
  }

  public _remainingThrows = MAX_REMAINING_THROWS;
  public _accumulatedPoints = 0;
  public _remainingPointsToDisplay = 0;
  public _averagePoints = 0;
  public _currentPlayer: BehaviorSubject<Player> = new BehaviorSubject(DEFAULT_PLAYER);
  public _cricketMap = new Map<number, number>();
  public _last3History: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public _history: HistoryEntry[] = [];

  init(player: Player) {
    this._currentPlayer.next(player);
    this._last3History.next(this.getLastThreeThrows());
    this._remainingPointsToDisplay = this._currentPlayer.value.remainingPoints;
    this._cricketMap = this._currentPlayer.value.cricketMap;
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
        this._currentPlayer.next(player);
        this._last3History.next(this.getLastThreeThrows());
        this._remainingPointsToDisplay = this._currentPlayer.value.remainingPoints;
        this._cricketMap = this._currentPlayer.value.cricketMap;
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
    playerHistory.hits.push(...this._currentPlayer.value.last3History);

    this._currentPlayer.value.history.push(playerHistory);
  }

  private reset() {
    this.resetAccumulatedPoints();
    this.resetThrows();
    this._currentPlayer.value.last3History = [];
  }

  private resetAccumulatedPoints() {
    this._accumulatedPoints = 0;
  }

  private resetThrows() {
    this._remainingThrows = MAX_REMAINING_THROWS;
  }

  scoreDart(points: number) {
    if (this.hasThrowsRemaining()) {
      this._remainingPointsToDisplay -= points;
      this._last3History.value.push(points);
      this.accumulatePoints(points);
      this.decrementRemainingThrows();
    } else {
      // TODO: show error message, wird manchmal geworfen, wenn man 3 mal auf den Button drückt, verhindert damit aber nicht das Spiel nur den Click zuviel
      throw new Error('Unable to reduce below 0');
    }
  }

  scoreCricket(points: number, multiplier: number) {
    if (this.hasThrowsRemaining()) {
      if (
        this._cricketMap.has(points / multiplier)
        &&
        this._cricketMap.get(points / multiplier) === 3) {
        this.accumulateCricketPoints(points, multiplier);
      } else {
        this.storeMultiplier(points, multiplier);
      }
      this.decrementRemainingThrows();
    } else {
      throw new Error('Unable to reduce below 0');
    }
  }

  private hasThrowsRemaining(): boolean {
    return this._remainingThrows > 0;
  }

  private accumulatePoints(points: number) {
    this._accumulatedPoints += points;
  }

  private accumulateCricketPoints(points: number, multiplier: number) {
    if (this.checkForClosedHit(points, multiplier)) {
      this._remainingPointsToDisplay += points;
      this._accumulatedPoints += points;
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

  applyPoints(isCricket?: boolean) {
    this._currentPlayer.value.lastScore = this._accumulatedPoints;
    if (isCricket) {
      this._currentPlayer.value.remainingPoints += this._accumulatedPoints;
    } else {
      this._currentPlayer.value.remainingPoints -= this._accumulatedPoints;
    }
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

  storeMultiplier(point: number, multiplier: number) {
    let map = this._currentPlayer.value.cricketMap;
    if (point > 0) {
      if (map.has((point / multiplier))) {
        map.forEach((value: number, key: number) => {

          if (key == (point / multiplier)) {
            const sumOfMultipliers = +value + +multiplier; // das ist ja kaputt :-( --> hat mich ewig viel zeit gekostet
            if (sumOfMultipliers == 3) {
              map.set(key, sumOfMultipliers);
            }
            if (sumOfMultipliers < 3) {
              map.set(key, sumOfMultipliers);
            }
            if (sumOfMultipliers > 3) {
              map.set(key, 3);
              const newMultiplier = sumOfMultipliers - 3;
              if (newMultiplier > 0) {
                this.setRestOfMultiplier(key, newMultiplier, multiplier);
              }
            }
          }
        });
      } else {
        map.set(point / multiplier, multiplier);
      }
    }
    this.sortMap();
  }

  sortMap() {
    const sortedMap = new Map([...this._cricketMap].sort());
    this._currentPlayer.value.cricketMap = sortedMap;
    this._cricketMap = sortedMap;
  }

  setRestOfMultiplier(point: number, multiplierRest: number, multiplier: number) {
    //bullseye
    let points = 0;
    if (point == 25 && multiplier == 2) {
      point = 50;
    }
    points = point * multiplierRest;
    this.accumulateCricketPoints(points, multiplier);
  }

  getLastThreeThrows() {
    return this._currentPlayer.value.last3History.slice(-3).reverse();
  }

  getHistory() {
    return this._currentPlayer.value.history.slice(-3).reverse();
  }

  checkForClosedHit(points: number, multiplier: number) {
    if (this.playerService._players.length < 2) {
      return true;
    }

    return this.playerService._players.some((player: Player) =>
      player.cricketMap.get(points / multiplier) !== 3)
  }

  showHistory(player?: Player) {
    const data: HistoryDialogData = {
      player: this.playerService.getPlayer(player ?? this._currentPlayer.value),
    }
    if (data.player.history.length > 0) {
      this.dialog.open(HistoryDialog, {data});
    }

  }
}
