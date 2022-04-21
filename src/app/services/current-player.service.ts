import { Injectable } from '@angular/core';
import { DEFAULT_PLAYER, Player } from "../modals/player/player.model";


export const MAX_REMAINING_THROWS = 3;


@Injectable({
  providedIn: 'root'
})
export class CurrentPlayerService {

  public _remainingThrows = MAX_REMAINING_THROWS;
  public _accumulatedPoints = 0;
  public _remainingPoints = 0;
  public _averagePoints = 0;
  public _currentPlayer: Player = DEFAULT_PLAYER;
  public _cricketMap = new Map<number, number>();

  init(player: Player) {
    this.switchPlayer(player);
    this._remainingPoints = player.remainingPoints;
  }

  switchPlayer(player: Player) {
    this.savePointsForStatistics();
    this._currentPlayer = player;
    this._remainingPoints = this._currentPlayer.remainingPoints;
    this._cricketMap = this._currentPlayer.cricketMap;
    this.resetAccumulatedPoints();
    this.resetThrows();
  }

  private savePointsForStatistics() {
    this._currentPlayer.history.push(this._accumulatedPoints);
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
      this.calcAverage();
    } else {
      throw new Error('Unable to reduce below 0');
    }
  }

  scoreCricket(points: number, multiplier: number) {
    if (this.hasThrowsRemaining()) {
      this.storeCricketPointsAndMultiplier(points, multiplier);
      this._remainingPoints += points;
      this.accumulatePoints(points);
      this.decrementRemainingThrows();
      this.calcAverage();
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
  }

  applyCricketPoints() {
    this._currentPlayer.lastScore = this._accumulatedPoints;
    this._currentPlayer.remainingPoints += this._accumulatedPoints;
    this._currentPlayer.cricketMap = this._cricketMap;
  }

  calcAverage() {
    let leng = this._currentPlayer.history.length;
    let sum = this._currentPlayer.history.reduce((a, b) => a + b);
    this._averagePoints = Math.round(sum / leng);
  }

  isDoubleOut(multiplier: number): boolean {
    return multiplier / 2 == 1;
  }

  storeCricketPointsAndMultiplier(point: number, multiplier: number) {
    let map = this._cricketMap;
    if (map.has((point / multiplier))) {
      map.forEach((value: number, key: number) => {
        if (key == (point / multiplier)) {
          var sumOfNumbers = +value + +multiplier; // das ist ja kaputt :-( --> hat mich ewig viel zeit gekostet
          if (sumOfNumbers <= 3) {
            map.set(key, sumOfNumbers);
          }
          if (sumOfNumbers >= 3) {
            map.set(key, 3);
          }
          if (value <= multiplier) {
            if (25 == (point / multiplier) && value == 2) {
              map.set(25, 3);
            }
          }
        }
      });
    } else {
      map.set(point / multiplier, multiplier);
    }
  }

  sortMap() {
    this._cricketMap = new Map([...this._cricketMap].sort());
  }
}
