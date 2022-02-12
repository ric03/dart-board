import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { DartCounterService } from 'src/app/services/dart-counter.service';
import { Player } from 'src/app/services/player.model';

@Component({
  selector: 'app-scoreboard-overview',
  templateUrl: './scoreboard-overview.component.html',
  styleUrls: ['./scoreboard-overview.component.scss']
})
export class ScoreboardOverviewComponent implements OnInit {
  public playerArr$$: Subject<Player[]>;
 

  constructor(private dartCounterService: DartCounterService) {
   this.playerArr$$ = this.dartCounterService.playerArr$$
  }

  ngOnInit(): void {
  }
}