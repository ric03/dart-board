import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {DartCounterService} from 'src/app/services/dart-counter.service';
import {Player} from 'src/app/services/player.model';

@Component({
  selector: 'app-scoreboard-overview',
  templateUrl: './player-overview.component.html',
  styleUrls: ['./player-overview.component.scss']
})
export class PlayerOverviewComponent {
  playerArr$: Observable<Player[]>;

  constructor(private dartCounterService: DartCounterService) {
    this.playerArr$ = this.dartCounterService.playerArr$$
  }

}
