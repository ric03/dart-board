import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {PlayerOverviewComponent} from './components/player-overview/player-overview.component';
import {CurrentPlayerProgressComponent} from './components/progress/current-player-progress.component';
import {ScoreboardComponent} from './scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    CurrentPlayerProgressComponent,
    PlayerOverviewComponent,
    ScoreboardComponent,
  ],
  imports: [
    CommonModule,

    MatCardModule,
    MatProgressBarModule,
  ],
  exports: [
    ScoreboardComponent,
  ]
})
export class ScoreBoardModule {
}
