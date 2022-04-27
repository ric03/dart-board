import {Component} from '@angular/core';
import {CurrentPlayerService, MAX_REMAINING_THROWS} from "../../../services/current-player.service";
import {RoundCountService} from "../../../services/round-count.service";

@Component({
  selector: 'app-current-player-progress',
  templateUrl: './current-player-progress.component.html',
  styleUrls: ['./current-player-progress.component.scss']
})
export class CurrentPlayerProgressComponent {

  readonly maxRemainingThrows = MAX_REMAINING_THROWS

  constructor(public currentPlayerService: CurrentPlayerService,
              public roundCountService: RoundCountService
  ) {
  }

  getDartCount(): number {
    return this.currentPlayerService._remainingThrows / MAX_REMAINING_THROWS * 100;
  }

  getCurrentPoints(): number {
    return this.currentPlayerService._remainingPoints - this.currentPlayerService._accumulatedPoints;
  }

}
