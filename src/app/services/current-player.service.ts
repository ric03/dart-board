import {Injectable} from '@angular/core';
import {DEFAULT_PLAYER, Player} from "./player.model";


export const MAX_REMAINING_THROWS = 3;


@Injectable({
  providedIn: 'root'
})
export class CurrentPlayerService {

  public _remainingThrows = MAX_REMAINING_THROWS;
  public _accumulatedPoints = 0;
  public _currentPlayer: Player = DEFAULT_PLAYER;

  init(player: Player) {
    this.switchPlayer(player);
  }

  switchPlayer(player: Player) {
    this._currentPlayer = player;
    this.resetAccumulatedPoints();
    this.resetThrows();
  }

  private resetAccumulatedPoints() {
    this._accumulatedPoints = 0;
  }

  private resetThrows() {
    this._remainingThrows = MAX_REMAINING_THROWS;
  }

  score(points: number) {
    if (this.hasThrowsRemaining()) {
      this.accumulatePoints(points);
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
    return expectedRemainingPoints < 0
  }

  applyPoints() {
    this._currentPlayer.remainingPoints -= this._accumulatedPoints;
  }
}
