import {Injectable} from '@angular/core';

export const ROUND_LIMIT = 45

@Injectable({
  providedIn: 'root'
})
export class RoundCountService {

  private readonly INITIAL_ROUND_COUNT = 1;
  private readonly MAX_ROUND_COUNT = ROUND_LIMIT;

  roundCount: number = this.INITIAL_ROUND_COUNT;

  getRemainingRounds(): number {
    return this.MAX_ROUND_COUNT - this.roundCount
  }

  incrementRoundCount() {
    this.roundCount++;
  }

  reset() {
    this.roundCount = this.INITIAL_ROUND_COUNT;
  }

  decrementRoundCount() {
    if (this.roundCount > 1) {
      this.roundCount--;
    }

  }
}
