import {Component} from '@angular/core';
import {CurrentPlayerService, MAX_REMAINING_THROWS} from "../../../services/current-player.service";
import {RoundCountService} from "../../../services/round-count.service";
import {PlayerService} from "../../../services/player.service";

@Component({
  selector: 'app-current-player-progress',
  templateUrl: './current-player-progress.component.html',
  styleUrls: ['./current-player-progress.component.scss']
})
export class CurrentPlayerProgressComponent {

  readonly maxRemainingThrows = MAX_REMAINING_THROWS

  constructor(public currentPlayerService: CurrentPlayerService,
              public roundCountService: RoundCountService,
              public playerService: PlayerService
  ) {
  }

  getDartCount(): number {
    return this.currentPlayerService._remainingThrows / MAX_REMAINING_THROWS * 100;
  }

}
