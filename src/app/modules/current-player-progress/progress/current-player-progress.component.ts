import {Component} from '@angular/core';
import {CurrentPlayerService} from "../../../services/current-player.service";
import {RoundCountService} from "../../../services/round-count.service";

@Component({
  selector: 'app-current-player-progress',
  templateUrl: './current-player-progress.component.html',
  styleUrls: ['./current-player-progress.component.scss']
})
export class CurrentPlayerProgressComponent {

  constructor(public currentPlayerService: CurrentPlayerService,
              public roundCountService: RoundCountService,
  ) {
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
}
