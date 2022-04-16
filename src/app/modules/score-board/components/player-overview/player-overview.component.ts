import {Component} from '@angular/core';
import {PlayerService} from "../../../../services/player.service";

@Component({
  selector: 'app-scoreboard-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss']
})
export class PlayerOverviewComponent {

  constructor(public playerService: PlayerService,
  ) {
  }

}
