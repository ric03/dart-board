import {Component} from '@angular/core';
import {Observable} from 'rxjs';
import {DartCounterService} from 'src/app/services/dart-counter.service';
import {Player} from 'src/app/services/player.model';

@Component({
  selector: 'app-scoreboard-overview',
  templateUrl: './scoreboard-overview.component.html',
  styleUrls: ['./scoreboard-overview.component.scss']
})
export class ScoreboardOverviewComponent {
  playerArr$: Observable<Player[]>;

  constructor(private dartCounterService: DartCounterService) {
    this.playerArr$ = this.dartCounterService.playerArr$$
  }

}
