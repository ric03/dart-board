import { Injectable } from '@angular/core';
import { DEFAULT_PLAYER, Player } from "./player.model";


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

  init(player: Player) {
    this.switchPlayer(player);
    this._remainingPoints = player.remainingPoints;
  }

  switchPlayer(player: Player) {
    this.savePointForStatistics();
    this._currentPlayer = player;
    this._remainingPoints = this._currentPlayer.remainingPoints;
    this.resetAccumulatedPoints();
    this.resetThrows();
  }

  private savePointForStatistics() {
    this._currentPlayer.history.push(this._accumulatedPoints);
  }

  private resetAccumulatedPoints() {
    this._accumulatedPoints = 0;
  }

  private resetThrows() {
    this._remainingThrows = MAX_REMAINING_THROWS;
  }

  score(points: number) {
    if (this.hasThrowsRemaining()) {
      this._remainingPoints -= points;
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
    return expectedRemainingPoints < 0
  }

  applyPoints() {
    this._currentPlayer.lastScore = this._accumulatedPoints;
    this._currentPlayer.remainingPoints -= this._accumulatedPoints;
  }

  calcAverage() {
    // TODO: das stimmt so noch nicht LOL
    // Der Drei - Dart - Durchschnitt in Darts ist die durchschnittliche Punktzahl,
    // die mit drei geworfenen Darts erzielt wird.
    let leng = this._currentPlayer.history.length +1 ;
    let sum = this._currentPlayer.history.reduce((a, b) => a + b, 0);
    this._averagePoints = sum / leng;
  }

  isDoubleOut(points: number): boolean {
    const expectedRemainingPoints = this._currentPlayer.remainingPoints - this._accumulatedPoints - points;
    return expectedRemainingPoints < 0
  }
}
