import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoundCountService {

  private readonly INITIAL_ROUND_COUNT = 1;
  private readonly MAX_ROUND_COUNT = 45;

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
}
