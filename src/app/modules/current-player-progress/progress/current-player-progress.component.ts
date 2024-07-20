import {Component} from '@angular/core';
import {CurrentPlayerService, MAX_REMAINING_THROWS} from "../../../services/current-player.service";
import {RoundCountService} from "../../../services/round-count.service";
import {PlayerService} from "../../../services/player.service";
import {BehaviorSubject, Observable} from "rxjs";

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

  getThrowCount(): number {
    return this.currentPlayerService._remainingThrows / MAX_REMAINING_THROWS * 100;
  }

  getProgressColor() {
    const remainingThrows = this.currentPlayerService._remainingThrows;
    switch (remainingThrows) {
      case 3:
        return 'primary';
      case 2:
        return 'accent';
      case 1:
        return 'warn';
      default:
        return undefined;
    }
  }

  getProgressTextColor() {
    const remainingThrows = this.currentPlayerService._remainingThrows;
    switch (remainingThrows) {
      case 3:
        return 'lightblue';
      case 2:
        return 'purple';
      case 1:
        return 'red';
      default:
        return 'lightblue';
    }
  }
}
