import {Injectable} from '@angular/core';
import {DEFAULT_PLAYER, Player} from "../models/player/player.model";


export const MAX_REMAINING_THROWS = 3;


@Injectable({
  providedIn: 'root'
})
export class CurrentPlayerService {

  public _remainingThrows = MAX_REMAINING_THROWS;
  public _accumulatedPoints = 0;
  public _remainingPoints = 0;
  public _averagePoints = 0;
  public _rounds = 0;
  public _currentPlayer: Player = DEFAULT_PLAYER;
  public _cricketMap = new Map<number, number>();
  public _last3History: number[] = [];

  init(player: Player) {
    this.switchPlayer(player);
    this._remainingPoints = player.remainingPoints;
    this._rounds = 1;
    this._last3History = [];
  }

  switchPlayer(player: Player) {
    this._currentPlayer = player;
    this._last3History = this.getLastThreeOfHistory();
    this._remainingPoints = this._currentPlayer.remainingPoints;
    this._cricketMap = this._currentPlayer.cricketMap;
    this._averagePoints = player.average;
    this.reset();
  }

  private savePointsForStatistics() {
    this._currentPlayer.history.push(this._accumulatedPoints);
  }

  private reset() {
    this.resetAccumulatedPoints();
    this.resetThrows();
  }

  private resetAccumulatedPoints() {
    this._accumulatedPoints = 0;
  }

  private resetThrows() {
    this._remainingThrows = MAX_REMAINING_THROWS;
  }

  scoreDart(points: number) {
    if (this.hasThrowsRemaining()) {
      this._remainingPoints -= points;
      this.accumulatePoints(points);
      this.decrementRemainingThrows();
    } else {
      throw new Error('Unable to reduce below 0');
    }
  }

  scoreCricket(points: number, multiplier: number) {
    if (this.hasThrowsRemaining()) {
      if (this._cricketMap.has(points / multiplier) && this._cricketMap.get(points / multiplier) == 3) {
        this._remainingPoints += points;
        this.accumulatePoints(points);
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

  private decrementRemainingThrows() {
    this._remainingThrows -= 1;
  }

  hasNoThrowsRemaining(): boolean {
    return !this.hasThrowsRemaining();
  }

  hasReachedZeroPoints(): boolean {
    const aggregatedRemainingPoints = this._currentPlayer.remainingPoints - this._accumulatedPoints;
    return aggregatedRemainingPoints == 0;
  }

  isOvershot(points: number): boolean {
    const expectedRemainingPoints = this._currentPlayer.remainingPoints - this._accumulatedPoints - points;
    return expectedRemainingPoints < 0;
  }

  applyDartPoints() {
    this._currentPlayer.lastScore = this._accumulatedPoints;
    this._currentPlayer.remainingPoints -= this._accumulatedPoints;
    this.savePointsForStatistics();
    this.calcAverage();
  }

  applyCricketPoints() {
    this._currentPlayer.lastScore = this._accumulatedPoints;
    this._currentPlayer.remainingPoints += this._accumulatedPoints;
    this.savePointsForStatistics();
    this.calcAverage();
  }

  calcAverage() {
    let arr = this._currentPlayer.history;
    let leng = arr.length;
    let sum = arr.reduce((a, b) => +a + +b);
    this._averagePoints = Math.round(sum / leng);
    this._currentPlayer.average = this._averagePoints;
  }

  isDoubleOut(multiplier: number): boolean {
    return multiplier / 2 == 1;
  }

  storeMultiplier(point: number, multiplier: number) {
    let map = this._currentPlayer.cricketMap;
    if (point > 0) {
      if (map.has((point / multiplier))) {
        map.forEach((value: number, key: number) => {

          if (key == (point / multiplier)) {
            var sumOfMultipliers = +value + +multiplier; // das ist ja kaputt :-( --> hat mich ewig viel zeit gekostet
            if (sumOfMultipliers == 3) {
              map.set(key, sumOfMultipliers);
            }
            if (sumOfMultipliers < 3) {
              map.set(key, sumOfMultipliers);
            }
            if (sumOfMultipliers > 3) {
              map.set(key, 3);
              var newMultiplier = sumOfMultipliers - 3;
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
    this._currentPlayer.cricketMap = new Map([...this._cricketMap].sort());
    this._cricketMap = this._currentPlayer.cricketMap;

  }

  setRestOfMultiplier(point: number, multiplierRest: number, multiplier: number) {
    //bullseye
    if (point == 25 && multiplier == 2) {
      point = 50;
    }
    this._remainingPoints += point * multiplierRest;
    this.accumulatePoints(this._remainingPoints);
  }

  getLastThreeOfHistory() {
    return this._currentPlayer.history.reverse().slice(0, 3);
  }

}
